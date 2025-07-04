"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { AnimatedPage } from "@/components/animated-page";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { MovieCard } from "@/components/MovieCard";
import { fetchWatchlist } from "@/lib/features/watchlistSlice";

export default function WatchlistPage() {
  const user = useAppSelector((state) => state.user);
  const { watchlist, loading } = useAppSelector((state) => state.watchlist);
  const dispatch = useAppDispatch();

  // Fetch watchlist from Firebase using user's name
  useEffect(() => {
    if (user?.name) {
      dispatch(fetchWatchlist(user.name));
    }
  }, [user?.name, dispatch]);

  // Redirect unauthenticated users
  if (!user?.name) {
    redirect("/");
  }

  // Show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-8 pt-20">
          <div className="flex items-center justify-center">
            <div className="text-lg">Loading your watchlist...</div>
          </div>
        </div>
      </div>
    );
  }

  // Render page
  return (
    <main className="min-h-screen bg-[#040714]/95 text-background">
      <AnimatedPage className="flex items-center py-8 pt-20 px-[calc(3.5vw+5px)] w-full">
        <div className="space-y-8 w-full">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">My Watchlist</h1>
            <p className="text-xl text-muted-foreground">
              {watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} saved
              for later
            </p>
          </div>

          {watchlist.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                Your watchlist is empty. Start adding movies you want to watch!
              </p>
            </div>
          ) : (
            <div className="flex items-center flex-wrap w-full space-x-8 space-y-8 pb-4 scrollbar-hide">
              {watchlist.map((movie) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-48 sm:w-56 md:w-56"
                >
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    showRemoveButton={true}
                    context="watchlist"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimatedPage>
    </main>
  );
}
