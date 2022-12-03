import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";

// images. stores, and types import
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMovieStore } from "@/stores/useMovieStore";
import { Genre, MovieWithVideo, Result } from "@/types/types";

type ModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const Modal = ({ isOpen, toggleModal }: ModalProps) => {
  const { movie, setMovie } = useMovieStore((state) => state);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  const closeModal = () => {
    toggleModal();
    setMovie(null);
  };

  useEffect(() => {
    if (!movie) return;

    const getMovie = async () => {
      try {
        const data: MovieWithVideo = await fetch(
          `https://api.themoviedb.org/3/${
            movie?.media_type === "tv" ? "tv" : "movie"
          }/${movie?.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&append_to_response=videos`
        ).then((res) => res.json());

        if (data?.videos) {
          const trailerIndex = data.videos.results.findIndex(
            (item: Result) => item.type === "Trailer"
          );
          setTrailer(data.videos?.results[trailerIndex]?.key);
        }
        if (data?.genres) {
          setGenres(data.genres);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getMovie();
  }, [movie]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  type="button"
                  aria-label="close modal"
                  className="absolute right-4 flex items-center p-1 rounded-full bg-gray-500 hover:bg-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  <XMarkIcon
                    aria-hidden="true"
                    className="w-4 aspect-square text-white"
                  />
                </button>
                <Dialog.Title
                  as="h1"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {movie?.title ?? movie?.name}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{movie?.overview}</p>
                </div>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  width="100%"
                  height="100%"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
