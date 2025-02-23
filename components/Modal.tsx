"use client";

import { Genre, Movie, Video } from "@lib/types";
import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

// Props for the modal component
interface Props {
  movie: Movie;
  closeModal: () => void;
}

// Modal component will display the movie details
interface User {
  email: string;
  username: string;
  favorites: number[];
}

// Modal component will display the movie details
const Modal = ({ movie, closeModal }: Props) => {
  // Router
  const router = useRouter();

  // States for video and genres
  const [video, setVideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  // State for loading
  const [loading, setLoading] = useState(true);
  // State for user
  const [user, setUser] = useState<User | null>(null);
  // State for is favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Session state
  const { data: session } = useSession();

  console.log("session", session);

  // Options for fetching movie details
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  // Fetch movie details
  const getMovieDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await res.json();

      //console.log("movie details", data);

      // Set video and genres states
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          // Find the trailer video
          (video: Video) => video.type === "Trailer"
        );
        // Set the video state
        setVideo(data.videos.results[index].key);
      }

      // Set genres state
      if (data?.genres) {
        setGenres(data.genres);
      }
    } catch (err) {
      console.log("Error fetching movie details", err);
    }
  };

  // Fetch movie details on component mount
  useEffect(() => {
    getMovieDetails();
  }, [movie]);

  const getUser = async () => {
    try {
      // Fetch user data
      const res = await fetch(`/api/user/${session?.user?.email}`);

      // Parse the response
      const data = await res.json();

      // Set user state
      setUser(data);

      // Check if the movie is in the user's favorites
      setIsFavorite(data.favorites.find((item: number) => item === movie.id));

      // Set loading state to false
      setLoading(false);
    } catch (err) {
      console.log("Error fetching user", err);
    }
  };

  // Fetch user data on session change
  // This will run when the user logs in or logs out
  useEffect(() => {
    if (session) getUser();
  }, [session]);

  // Handle my list
  // This function will add or remove the movie from the user's favorites
  const handleMyList = async () => {
    try {
      // Check if the movie is already in the user's favorites
      const res = await fetch(`/api/user/${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movie.id }),
      });
      // Parse the response
      const data = await res.json();

      // Set user state
      setUser(data);

      // Check if the movie is in the user's favorites
      setIsFavorite(data.favorites.find((item: number) => item === movie.id));

      // Refresh the router
      // This will trigger the useUser hook to fetch the user data again
      router.refresh();
    } catch (err) {
      console.log("Failed to handle my list", err);
    }
  };

  console.log("user", user);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* Modal */}
      <div className="modal">
        {/* Modal close button */}
        <button className="modal-close" onClick={closeModal}>
          <CancelRounded
            sx={{
              color: "white",
              fontSize: "35px",
              ":hover": { color: "red" },
            }}
          />
        </button>

        {/* Modal video */}
        <iframe
          src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
          className="modal-video"
          loading="lazy"
          allowFullScreen
        />

        {/* Modal content */}
        <div className="modal-content">
          {/* Movie title */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className="text-base-bold">Name:</p>
              <p className="text-base-light">{movie?.title || movie?.name}</p>
            </div>

            {/* Add to list */}
            <div className="flex gap-3">
              <p className="text-base-bold"> {isFavorite ? 'Remove From List' : 'Add To List'}</p>
              {isFavorite ? (
                <RemoveCircle
                  className="cursor-pointer text-red-600"
                  onClick={handleMyList}
                />
              ) : (
                <AddCircle
                  className="cursor-pointer text-red-600"
                  onClick={handleMyList}
                />
              )}
            </div>
          </div>

          {/* Release Date */}
          <div className="flex gap-2">
            <p className="text-base-bold">Release Date:</p>
            <p className="text-base-light">{movie?.release_date}</p>
          </div>

          <p className="text-base-light">{movie?.overview}</p>

          {/* Rating */}
          <div className="flex gap-2">
            <p className="text-base-bold">Rating:</p>
            <p className="text-base-light">{movie?.vote_average}</p>
          </div>

          {/* Genres */}
          <div className="flex gap-2">
            <p className="text-base-bold">Genres:</p>
            <p className="text-base-light">
              {genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
