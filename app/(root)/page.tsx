import { fetchGenreMovies } from "@actions/movieData";
import CategoryList from "@components/CategoryList";
import Hero from "@components/Hero";
import Navbar from "@components/Navbar";
import { Genre } from "@lib/types";

const Home = async () => {
  // Fetch the genre movies
  const genres = await fetchGenreMovies();

  // Get the first two genres
  const example = genres.slice(0, 2);
  
  // Log the first two genres
  //console.log(example);
  
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="all-movies">
        {genres.map((genre: Genre) => (
          <CategoryList
            key={genre.id}
            title={genre.name}
            movies={genre.movies}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
