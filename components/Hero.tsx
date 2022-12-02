import Image from "next/image";
import { useState, useEffect } from "react";

// images import
import { PlayIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// types and constants import
import { Movie } from "@/types/types";

type HeroProps = {
  movies: Movie[];
};

const Hero = ({ movies }: HeroProps) => {
  const [movie, setMovie] = useState<Movie | null>();

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * movies.length);
    setMovie(movies[randomNumber]);
  }, [movies]);

  return (
    <section aria-label="hero section" className="w-full pt-10 pb-24 ">
      {movie && (
        <div className="w-[89vw] max-w-screen-2xl mx-auto">
          <div className="absolute inset-0 -z-10 w-full h-screen">
            <div className="z-10 absolute inset-0 w-full h-full bg-black/75 bg-gradient-body from-gray-900/10 to-[#010511]" />
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              alt={movie?.title ?? "poster"}
              className="object-cover"
              fill
              priority
            />
          </div>
          <div className="pt-24 max-w-lg grid space-y-2 ">
            <h1 className="text-3xl md:text-4xl font-bold">{movie?.title}</h1>
            <div className="flex space-x-2 text-xs md:text-sm font-semibold">
              <p className="text-green-600 ">{movie?.vote_average} Ratings</p>
              <p className="text-gray-300">{movie?.release_date}</p>
            </div>
            <p className="text-gray-300 text-sm md:text-base line-clamp-4">
              {movie?.overview}
            </p>
            <div className="pt-1.5 flex items-center space-x-2">
              <button
                aria-label="play video"
                className="px-3 py-1 bg-white rounded-sm flex items-center space-x-1.5 text-black text-sm md:text-base font-bold whitespace-nowrap hover:opacity-75 active:opacity-100 transition-opacity"
              >
                <PlayIcon className="w-4 aspect-square" />
                <p>Play</p>
              </button>
              <button
                aria-label="show more info"
                className="px-3 py-1 bg-gray-400/40 rounded-sm flex items-center space-x-1.5 text-white text-sm md:text-base font-medium whitespace-nowrap hover:opacity-75 active:opacity-100 transition-opacity"
              >
                <InformationCircleIcon className="w-4 aspect-square" />
                <p>More Info</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
