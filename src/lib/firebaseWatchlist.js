import db from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Get watchlist from Firebase for a user (by name)
 */

export const getWatchlist = async (username) => {
  if (!username) return [];
  try {
    const docRef = doc(db, "watchlists", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().movies || [];
    }
    return [];
  } catch (err) {
    console.error("Error fetching watchlist:", err);
    return [];
  }
};

/**
 * Save watchlist to Firebase (by userName)
 */
export const saveWatchlist = async (userName, watchlist) => {
  if (!userName) return;

  const sanitized = watchlist.map((movie) => ({
    id: movie.id,
    title: movie.title || "",
    poster_path: movie.poster_path || "",
    vote_average: movie.vote_average || 0,
    release_date: movie.release_date || "",
    overview: movie.overview || "",
    media_type: movie.media_type || "movie",
  }));

  const docRef = doc(db, "watchlists", userName); // saving with name
  await setDoc(docRef, { movies: sanitized });
};
