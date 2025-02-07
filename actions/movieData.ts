import { getApiResponse } from "@lib/requests"

// Description: This function fetches the trending movies from the server
export const fetchTrending = async () => {
    const data = await getApiResponse("/trending/movie/week");
    const trending = data.results;

    return trending;
}