import { baseImgUrl } from "@lib/constants";
import { Movie } from "@lib/types";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`}
        className="thumbnail"
        alt={movie?.title || movie?.name}
      />
      <div className="border"></div>
    </div>
  );
};

export default MovieCard;
