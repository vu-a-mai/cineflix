"use client";

import { baseImgUrl } from "@lib/constants";
import { Movie } from "@lib/types";
import { useState } from "react";
import Modal from "./Modal";

// MovieCard component will display the movie card
const MovieCard = ({ movie }: { movie: Movie }) => {
  // Show modal state
  const [showModal, setShowModal] = useState(false);

  // Open and close modal functions
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      {/* Movie card */}
      <div className="movie-card" onClick={openModal}>
        <img
          src={
            movie?.backdrop_path || movie?.poster_path
              ? `${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`
              : "/assets/no-image.png"
          }
          className="thumbnail"
          alt={movie?.title || movie?.name}
        />
        <div className="border"></div>
      </div>

      {/* Modal */}
      {showModal && <Modal movie={movie} closeModal={closeModal} />}
    </>
  );
};

export default MovieCard;
