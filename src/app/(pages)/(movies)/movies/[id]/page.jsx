"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Link as LinkIcon,
  Calendar,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MovieActions from "./MoviesAction.jsx";
import CastMember from "./CastMember";

const TMDB_API_KEY = "9c9507db04f409d6558ccc85828c568d";

export default function MovieDetailPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const params = useParams();
  const id = params?.id;

  const saveMovieToDB = async (movieData) => {
    const body = {
      name: movieData.title,
      description: movieData.overview,
      cast: movieData.credits?.cast
        ?.slice(0, 5)
        .map((actor) => ({ name: actor.name })),
    };

    try {
      const res = await fetch("/api/saveMovie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      console.log("Movie saved:", json.movie);
      setSaveSuccess(true);
    } catch (error) {
      console.error("Error saving movie:", error.message);
      setSaveSuccess(false);
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;

      setLoading(true);
      setError(false);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits&api_key=${TMDB_API_KEY}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movie");
        }

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Movie fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h1 className="text-2xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground">This page could not be found.</p>
        <Link href="/" className="mt-4 text-primary hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const director = movie.credits?.crew?.find(
    (member) => member.job === "Director"
  );
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg";
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "/placeholder.svg";

  return (
    <div className="animate-fade-in bg-[#0b0c10]">
      <div className="relative h-64 md:h-100 w-full">
        <Image
          src={backdropUrl}
          alt={`${movie.title || "Movie"} backdrop`}
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/50 to-transparent" />
      </div>
      {/* 
      <main className="container mx-auto px-4 py-8 md:py-12 -mt-32 md:-mt-48 relative"> */}
      <main className="container mx-auto px-4 py-8 md:py-12 -mt-32 md:-mt-48 relative text-white bg-[#0b0c10]">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Movies
          </Link>
          <MovieActions movie={movie} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1 lg:col-span-1">
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={posterUrl}
                alt={movie.title || "Movie Poster"}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3 space-y-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                {movie.title}
              </h1>

              {!saveSuccess && (
                <button
                  onClick={() => saveMovieToDB(movie)}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-secondary/20 transition"
                >
                  Save Movie to DB
                </button>
              )}
              {saveSuccess && (
                <p className="text-green-600 font-medium mt-2">
                  Movie saved to database!
                </p>
              )}

              {movie.tagline && (
                <p className="text-lg md:text-xl text-muted-foreground italic mt-2">
                  "{movie.tagline}"
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>
                    {movie.vote_average?.toFixed(1)}/10 (
                    {movie.vote_count?.toLocaleString()} votes)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {movie.release_date && (
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{movie.runtime} min</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres?.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {director && (
                  <div>
                    <p className="font-semibold">Director</p>
                    <p className="text-muted-foreground">{director.name}</p>
                  </div>
                )}
                {movie.release_date && (
                  <div>
                    <p className="font-semibold">Released</p>
                    <p className="text-muted-foreground">
                      {new Date(movie.release_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {movie.homepage && (
                  <div>
                    <p className="font-semibold">Website</p>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Official Website <LinkIcon className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movie.credits?.cast?.slice(0, 12).map((member) => (
                  <CastMember key={member.id} actor={member} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
