import { getApiResponse } from "@lib/requests";
import { Movie, Genre } from "@lib/types";

interface MovieResponse {
  results: Movie[];
}

interface GenreResponse {
  genres: Genre[];
}

interface MovieDetails extends Movie {
  videos: {
    results: {
      key: string;
      type: string;
      site: string;
    }[];
  };
}

/**
 * Fetches trending movies for the week
 * @returns Promise<Movie[]> Array of trending movies
 * @throws Error if the API request fails
 */
export const fetchTrending = async (): Promise<Movie[]> => {
  try {
    const data = await getApiResponse("/trending/movie/week") as MovieResponse;
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw new Error("Failed to fetch trending movies");
  }
};

/**
 * Fetches all movie genres and their associated movies
 * @returns Promise<Genre[]> Array of genres with their movies
 * @throws Error if the API request fails
 */
export const fetchGenreMovies = async (): Promise<Genre[]> => {
  try {
    const data = await getApiResponse("/genre/movie/list") as GenreResponse;
    const genres = data.genres;

    // Fetch movies for each genre in parallel
    const genresWithMovies = await Promise.all(
      genres.map(async (genre) => {
        const genreData = await getApiResponse(
          `/discover/movie?with_genres=${genre.id}`
        ) as MovieResponse;
        return { ...genre, movies: genreData.results };
      })
    );

    return genresWithMovies;
  } catch (error) {
    console.error("Error fetching genre movies:", error);
    throw new Error("Failed to fetch genre movies");
  }
};

/**
 * Searches for movies based on a query string
 * @param query Search query string
 * @returns Promise<Movie[]> Array of movies matching the search query
 * @throws Error if the query is invalid or the API request fails
 */
export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query || query.trim().length === 0) {
    throw new Error("Search query cannot be empty");
  }

  try {
    const data = await getApiResponse(`/search/movie?query=${encodeURIComponent(query)}`) as MovieResponse;
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Failed to search movies");
  }
};

/**
 * Fetches detailed information for a specific movie
 * @param id Movie ID
 * @returns Promise<MovieDetails> Detailed movie information including videos
 * @throws Error if the ID is invalid or the API request fails
 */
export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  if (!id || id <= 0) {
    throw new Error("Invalid movie ID");
  }

  try {
    const movieDetails = await getApiResponse(`/movie/${id}?append_to_response=videos`) as MovieDetails;
    return movieDetails;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details");
  }
}