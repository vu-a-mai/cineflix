import { getApiResponse } from "@lib/requests";

// Description: This function fetches the trending movies from the server
export const fetchTrending = async () => {
  const data = await getApiResponse("/trending/movie/week");
  const trending = data.results;

  return trending;
};

// Description: This function fetches the popular movies from the server
export const fetchGenreMovies = async () => {
  const data = await getApiResponse("/genre/movie/list");
  const genres = data.genres;

  // Fetch movies for each genre
  for (const genre of genres) {
    const genreData = await getApiResponse(
      `/discover/movie?with_genres=${genre.id}`
    );
    genre.movies = genreData.results;
  }

  return genres;
};

// Description: This function fetches the movie details from the server
export const searchMovies = async (query: string) => {
  const data = await getApiResponse(`/search/movie?query=${query}`);
  const searchMovies = data.results;

  return searchMovies;
}