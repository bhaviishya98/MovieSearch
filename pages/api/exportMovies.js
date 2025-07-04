import dbConnect from "../../lib/db";
import Movie from "../../models/Movie";
import { Parser } from "json2csv";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const movies = await Movie.find();

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    const moviesWithFormattedCast = movies.map((movie) => ({
      name: movie.name,
      description: movie.description,
      cast: movie.cast.map((c) => c.name).join(", "),
      
    }));

    const json2csvParser = new Parser({
      fields: ["name", "description", "cast", "createdAt", "updatedAt"],
    });

    const csv = json2csvParser.parse(moviesWithFormattedCast);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=movies.csv");
    res.status(200).send(csv);
  } catch (error) {
    console.error("CSV export error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
