import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true,
    },
    cast: [
      {
        name: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
