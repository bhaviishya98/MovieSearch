import dbConnect from "../../lib/db";
import Movie from "../../models/Movie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { name, cast, description, genres } = req.body;

    console.log("Received movie data:", req.body);
    

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    const existingMovie = await Movie.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    const updatedMovie = await Movie.findOneAndUpdate(
      { name: new RegExp(`^${name}$`, "i") },
      { name, cast, description, genres },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: existingMovie
        ? "Movie updated successfully"
        : "Movie created successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    console.error("Error saving movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
