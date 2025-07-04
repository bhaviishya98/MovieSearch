import Link from "next/link";
import { Film, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-16">
      <div className="container py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Film className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="font-bold text-base sm:text-lg">
                MovieSearch
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover your next favorite movie with our comprehensive database
              of films from around the world.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Browse</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/category/popular"
                className="block text-muted-foreground hover:text-primary"
              >
                Popular Movies
              </Link>
              <Link
                href="/category/now-playing"
                className="block text-muted-foreground hover:text-primary"
              >
                Now Playing
              </Link>
              <Link
                href="/category/upcoming"
                className="block text-muted-foreground hover:text-primary"
              >
                Upcoming
              </Link>
              <Link
                href="/category/trending"
                className="block text-muted-foreground hover:text-primary"
              >
                Trending
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Account</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/watchlist"
                className="block text-muted-foreground hover:text-primary"
              >
                My Watchlist
              </Link>
              <Link
                href="/movies"
                className="block text-muted-foreground hover:text-primary"
              >
                Browse Movies
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; 2024 MovieSearch. All rights reserved. Movie data provided by
            TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
