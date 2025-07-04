"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const url =
        "https://api.themoviedb.org/4/account/663b7ee208ba251f1805b116/movie/recommendations?page=1&language=en-US";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: process.env.TMDB_BEARER_TOKEN,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch v4 recommendations.");
        }
        const data = await response.json();

        // If data is an object with `results`, otherwise adapt accordingly
        const results = data?.results || data;
        setMovies(results.slice(0, 20));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const cardWidth =
        window.innerWidth < 640 ? 140 : window.innerWidth < 768 ? 160 : 188;
      const visibleCards = Math.floor(containerWidth / cardWidth);
      const scrollAmount = visibleCards * cardWidth;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const cardWidth =
        window.innerWidth < 640 ? 140 : window.innerWidth < 768 ? 160 : 188;
      const visibleCards = Math.floor(containerWidth / cardWidth);
      const scrollAmount = visibleCards * cardWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-8">
        <p>Error: {error}</p>
        <p>Could not load recommended movies.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-28 text-white font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Recommended for You</h2>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="icon" onClick={scrollLeft}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={scrollRight}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48 sm:w-56 md:w-64">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedMovies;
