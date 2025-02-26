import { fetchMovieDetails } from "@actions/movieData";
import { fetchMyList } from "@actions/user";
import MovieCard from "@components/MovieCard";
import Navbar from "@components/Navbar";
import { Movie } from "@lib/types";

// Enable Incremental Static Regeneration (ISR) for this page
// This means the page will be statically generated at build time
// and revalidated every 60 seconds in production
// Benefits:
// 1. Improved performance by serving cached pages
// 2. Reduced database load by limiting direct queries
// 3. Better user experience with faster page loads
// 4. Automatic updates without manual redeployment
export const revalidate = 60; // Revalidate every 60 seconds

// MyList component displays the user's favorite movies
// It uses ISR to balance between static generation benefits
// and data freshness
const MyList = async () => {
  // Fetch user's favorite movies from the database
  // This data will be cached and revalidated according to the revalidate setting
  const myList = await fetchMyList();

  // Fetch detailed information for each movie in the user's favorites
  // These requests are executed in parallel using Promise.all for better performance
  const myListDetails = await Promise.all(
    myList.map(async (movieId: number) => {
      const movieDetails = await fetchMovieDetails(movieId);
      return movieDetails;
    })
  );

  return (
    <>
      <Navbar />
      <div className="list">
        {/* Render movie cards for each movie in the user's favorites
            Each card displays the movie's details and allows user interaction */}
        {myListDetails.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MyList;