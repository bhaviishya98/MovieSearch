"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/firebase";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "@/lib/features/userSlice";
import { signInWithPopup, signOut } from "firebase/auth";
import { Film } from "lucide-react";


const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Set user on auth state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/home");
      }
    });
    return () => unsubscribe();
  }, [userName, dispatch, router]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => alert(error.message));
    } else {
      signOut(auth)
        .then(() => {
          dispatch(setSignOutState());
          router.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  // Debounced live search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim()) {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const searchMovies = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
    );
    const data = await response.json();
    return data.results;
  };

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] bg-[#090b13] flex items-center justify-between px-9 z-50">
      <Link href="/home" >
        <div className="flex items-center space-x-2 text-background">
          <Film className="h-5 w-5 sm:h-6 sm:w-6 text-background" />
          <span className="font-bold text-base sm:text-lg">MovieSearch</span>
        </div>
      </Link>
      {/* <Image src="/images/logo.svg" alt="Disney+" width={80} height={70} /> */}

      {!userName ? (
        <button
          onClick={handleAuth}
          className="bg-black/60 px-4 py-2 uppercase tracking-wider border border-white rounded hover:bg-white hover:text-black transition text-white"
        >
          Login
        </button>
      ) : (
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="flex space-x-6 items-center">
            <Link
              href="/home"
              className="flex items-center space-x-2 text-white hover:underline"
            >
              <Image
                src="/images/home-icon.svg"
                alt="HOME"
                width={20}
                height={20}
              />
              <span>HOME</span>
            </Link>

            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                className="flex items-center space-x-2 text-white"
                onClick={() => {
                  const nextState = !searchVisible;
                  setSearchVisible(nextState);
                  if (!nextState) {
                    setSearchQuery("");
                    setSearchResults([]);
                  }
                }}
              >
                <Image
                  src="/images/search-icon.svg"
                  alt="SEARCH"
                  width={20}
                  height={20}
                />
                <span>SEARCH</span>
              </button>

              {searchVisible && (
                <div className="absolute top-10 left-0 bg-[#090b13] border border-gray-700 rounded p-4 w-80 shadow-xl z-50 text-white">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col space-y-2"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a movie"
                      className="p-2 border border-gray-300 rounded bg-[#131313] text-white"
                    />
                  </form>

                  <div className="mt-3 space-y-2 max-h-96 overflow-y-auto scrollbar-hide text-white">
                    {searchResults.length > 0 ? (
                      searchResults
                        .filter(
                          (result) => result.poster_path || result.backdrop_path
                        )
                        .map((result) => (
                          <Link
                            key={result.id}
                            href={`/movies/${result.id}`}
                            className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded transition hover:text-black"
                            onClick={() => {
                              setSearchVisible(false);
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${
                                result.poster_path || result.backdrop_path
                              }`}
                              alt={result.title || result.name}
                              className="w-12 h-12 object-cover rounded-full"
                            />
                            <span className="text-sm font-medium">
                              {result.title || result.name}
                            </span>
                          </Link>
                        ))
                    ) : searchQuery ? (
                      <p className="text-sm text-white">No results found.</p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/watchlist"
              className="flex items-center space-x-2 text-white hover:underline"
            >
              <Image
                src="/images/watchlist-icon.svg"
                alt="WATCHLIST"
                width={20}
                height={20}
              />
              <span>WATCHLIST</span>
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative group cursor-pointer">
            <Image
              src={userPhoto}
              alt={userName}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="absolute right-0 top-12 bg-[#131313] border border-gray-400 rounded p-2 opacity-0 group-hover:opacity-100 transition duration-500 w-28 text-white text-sm text-center tracking-wide">
              <span onClick={handleAuth}>Sign out</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
