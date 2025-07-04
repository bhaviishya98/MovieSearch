"use client";

import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/features/watchlistSlice";

export default function MovieActions({ movie }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const watchlist = useSelector((state) => state.watchlist.watchlist);

  if (!user) return null; // Don't show button if user is not logged in

  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ userId: user.id, movieId: movie.id }));
    } else {
      dispatch(addToWatchlist({ userId: user.id, movie }));
    }
  };

  return (
    <Button
      onClick={handleWatchlistToggle}
      variant={isInWatchlist ? "default" : "secondary"}
    >
      {isInWatchlist ? (
        <>
          <Heart className="mr-2 h-4 w-4 fill-current" />
          Added to Watchlist
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Add to Watchlist
        </>
      )}
    </Button>
  );
}
