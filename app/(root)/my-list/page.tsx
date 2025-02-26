import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { fetchMovieDetails } from "@actions/movieData";
import MovieCard from "@components/MovieCard";
import Navbar from "@components/Navbar";
import { Movie } from "@lib/types";

/**
 * MyList Component - Server Side Component
 * 
 * Displays a user's list of favorite movies. This component handles:
 * 1. Server-side authentication check using NextAuth
 * 2. Database connection and user favorites retrieval
 * 3. Parallel fetching of detailed movie information
 * 
 * Protected Route: Redirects to login if user is not authenticated
 * 
 * @returns {Promise<JSX.Element>} Rendered list of favorite movies
 */
const MyList = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Connect to database
  await connectToDB();

  // Find the user and their favorites
  const user = await User.findOne({ email: session.user?.email }).select("favorites");
  if (!user) {
    throw new Error("User not found");
  }

  // Fetch detailed information for each movie in parallel
  const myListDetails = await Promise.all(
    user.favorites.map(async (movieId: number) => {
      const movieDetails = await fetchMovieDetails(movieId);
      return movieDetails;
    })
  );

  return (
    <>
      <Navbar />
      <div className="list">
        {myListDetails.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MyList;