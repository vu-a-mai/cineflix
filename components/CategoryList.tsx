import { Movie } from "@lib/types";
import MovieCard from "./MovieCard";

interface Props {
  title: string;
  movies: Movie[];
}

// Description: This component displays a list of movies for a specific category
const CategoryList = ({ title, movies }: Props) => {
  return (
    <div className="category">
      <h1 className="category-title">{title}</h1>
      <div className="movie-list">
        {movies.map((movies) => (
          <MovieCard key={movies.id} movie={movies} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
