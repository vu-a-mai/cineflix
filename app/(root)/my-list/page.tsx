import { fetchMovieDetails } from "@actions/movieData";
import { fetchMyList } from "@actions/user";
import MovieCard from "@components/MovieCard";
import Navbar from "@components/Navbar";
import { Movie } from "@lib/types";

// Mark this route as dynamic to handle server-side functionality
export const dynamic = 'force-dynamic';

// MyList component will display the user's favorite movies
const MyList = async () => {
  // Fetch user's favorite movies
  const myList = await fetchMyList();

  // Fetch movie details for each movie in the user's favorites
  const myListDetails = await Promise.all(
    // Map over each movie ID in the user's favorites
    myList.map(async (movieId: number) => {
      // Fetch movie details
      const movieDetails = await fetchMovieDetails(movieId);
      // Return the movie details
      return movieDetails;
    })
  );

  return (
    <>
    {/* Render the navbar component  */}
      <Navbar />
      <div className="list">
        {/* Map over each movie in the user's favorites and display the movie details in a movie card component  */}
        {myListDetails.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MyList;