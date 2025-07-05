import dbConnect from "../../lib/db";
import Movie from "../../models/Movie";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    let allMovies = [];

    const { pages } = req.body;
    const TOTAL_PAGES = Math.min(Number(pages) || 3, 100);

    // const TOTAL_PAGES = 3;

    for (let page = 1; page <= TOTAL_PAGES; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&append_to_response=credits`
      );

      const data = await response.json();

      for (const movie of data.results) {
        // Fetch full movie details (to get cast and description)
        const detailsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US&append_to_response=credits&api_key=${TMDB_API_KEY}`
        );

        const fullDetails = await detailsRes.json();

        const name = fullDetails.title;
        const description = fullDetails.overview || "No description available.";
        const cast = fullDetails.credits?.cast?.map((actor) => ({
          name: actor.name,
        }));

        if (!name || !description) continue;

        const existingMovie = await Movie.findOne({
          name: new RegExp(`^${name}$`, "i"),
        });

        await Movie.findOneAndUpdate(
          { name: new RegExp(`^${name}$`, "i") },
          { name, description, cast },
          {
            new: true,
            upsert: true,
            runValidators: true,
          }
        );
        console.log(`Movie processed: ${name}`);

        allMovies.push(name);
      }
    }

    res.status(200).json({
      message: `${allMovies.length} movies imported successfully.`,
      movies: allMovies,
    });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
