import { fetchTrending } from "@actions/movieData"
import HeroCard from "./HeroCard"

// Description: This function fetches the trending movies from the server
// Hero component will display the hero card
const Hero = async () => {
    // fetch the trending movies
    const trending = await fetchTrending()
    // get a random number
    const randomNumber = Math.floor(Math.random() * trending.length)
    // get the trending movie from the trending movies array
    const trendingMovie = trending[randomNumber]

  return (
    <div>
      <HeroCard trendingMovie={trendingMovie} />
    </div>
  )
}

export default Hero
