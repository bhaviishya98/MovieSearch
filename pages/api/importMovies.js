import dbConnect from "../../lib/db";
import Movie from "../../models/Movie";

const TMDB_API_KEY =
  process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { pages } = req.body;
    const TOTAL_PAGES = Math.min(Number(pages) || 500, 500); // TMDB max is 500

    let allMovies = [];

    for (let page = 1; page <= TOTAL_PAGES; page++) {
      await delay(300); // to avoid hitting rate limits

      const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;

      let response;
      try {
        response = await fetch(discoverUrl);
        if (!response.ok)
          throw new Error(`TMDB Discover failed (Page ${page})`);
      } catch (err) {
        console.error(`Error fetching discover page ${page}:`, err.message);
        continue;
      }

      const data = await response.json();

      for (const movie of data.results) {
        try {
          await delay(250); // throttle movie details request

          const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`;
          const detailsRes = await fetch(detailsUrl);

          if (!detailsRes.ok) {
            console.error(`Failed to fetch details for movie ID ${movie.id}`);
            continue;
          }

          const fullDetails = await detailsRes.json();

          const name = fullDetails.title;
          const description =
            fullDetails.overview || "No description available.";
          const cast =
            fullDetails.credits?.cast?.slice(0, 10).map((actor) => ({
              name: actor.name,
              character: actor.character || "Unknown",
            })) || [];
          const genres = fullDetails.genres?.map((genre) => genre.name) || [];

          if (!name || !description) continue;

          await Movie.findOneAndUpdate(
            { name: new RegExp(`^${name}$`, "i") },
            { name, description, cast, genres },
            {
              new: true,
              upsert: true,
              runValidators: true,
            }
          );

          console.log(`✅ Imported: ${name}`);
          allMovies.push(name);
        } catch (movieError) {
          console.error(
            `❌ Error processing movie ID ${movie.id}:`,
            movieError.message
          );
        }
      }
    }

    res.status(200).json({
      message: `${allMovies.length} movies imported successfully.`,
      movies: allMovies,
    });
  } catch (error) {
    console.error("Import error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
