"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/features/watchlistSlice";

export function MovieCard({ movie, showWatchlistButton = true }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const watchlist = useSelector((state) => state.watchlist.watchlist);

  // console.log("checking watchlist", watchlist);
  

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user.id) return;

    console.log("this is user", user);
    console.log("this is movie", movie);
    
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ userId: user.name, movieId: movie.id }));
    } else {
      dispatch(addToWatchlist({ userId: user.name, movie }));
    }
  };

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-105 relative h-[450px] flex flex-col border-none p-0 ">
        <div className="aspect-[2/3] relative overflow-hidden">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
          {user && showWatchlistButton && (
            <Button
              size="icon"
              variant={isInWatchlist ? "default" : "secondary"}
              className="absolute top-4 right-3  z-10 h-8 w-8 sm:h-9 sm:w-9 "
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist ? (
                <Heart className="h-3 w-3 sm:h-4 sm:w-4  fill-current" />
              ) : (
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          )}
        </div>
        <CardContent className="p-2 sm:p-3 flex-1 flex flex-col max-h-[200px]">
          <h3 className="font-semibold line-clamp-2 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base h-[2rem] ">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <Badge variant="secondary" className="text-xs">
              {releaseYear}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-2 w-2 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground truncate line-clamp-3  hidden sm:block">
            {movie.overview}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
