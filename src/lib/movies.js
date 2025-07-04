const TMDB_API_KEY = process.env.TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

export async function getMovieDetails(id) {
  try {
    console.log("getting id", id);

    const response = await fetch(
      `${API_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits`
    );

    if (!response.ok) {
      // This will be caught by the page and trigger a 404
      return null;
    }

    const data = await response.json();
    console.log("response", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return null;
  }
}
