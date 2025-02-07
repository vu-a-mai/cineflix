import { baseImgUrl } from "@lib/constants";
import { Movie } from "@lib/types";
import { InfoOutlined, PlayCircleOutlineOutlined } from "@node_modules/@mui/icons-material";

// HeroCard component will display the movie
const HeroCard = ({ trendingMovie }: { trendingMovie: Movie }) => {
  console.log(trendingMovie);
  return (
    <div className="hero">
        {/* hero background */}
      <div className="hero-bg">
        {/* image */}
        <img
          src={`${baseImgUrl}${
            trendingMovie?.backdrop_path || trendingMovie?.poster_path
          }`}
          alt="trending-movie"
          className="hero-bg-image"
        />
        {/* overlay */}
        <div className="overlay"></div>
      </div>
      {/* title */}
      <h1 className="hero-title">{trendingMovie?.title || trendingMovie?.name}</h1>
      {/* overview */}
      <p className="hero-overview">{trendingMovie?.overview}</p>
      {/* buttons */}
      <div className="hero-btns">
        {/* play now */}
        <button className="hero-btn"><PlayCircleOutlineOutlined /> Play Now</button>
        {/* more info */}
        <button className="hero-btn"><InfoOutlined /> More Info</button>
        </div>
    </div>
  );
};

export default HeroCard;
