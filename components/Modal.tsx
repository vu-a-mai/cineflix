"use client";

import { Genre, Movie, Video } from "@lib/types";
import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

interface Props {
  movie: Movie;
  closeModal: () => void;
}

// Modal component will display the movie details
const Modal = ({ movie, closeModal }: Props) => {
  // States for video and genres
  const [video, setVideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

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

      console.log("movie details", data);

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

  return (
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
              <p className="text-base-bold">Add To List</p>

              <AddCircle className="cursor-pointer text-red-600" />
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
