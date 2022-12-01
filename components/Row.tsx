import { useState, useEffect, useRef } from "react";

// images import
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// types import
import { Movie } from "@/types/types";
import Image from "next/image";

type RowProps = {
  title: string;
  movies: Movie[];
};

const Row = ({ title, movies }: RowProps) => {
  const moviesRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToPoint = (direction: "left" | "right") => {
    if (!moviesRef.current) return;

    console.log(moviesRef.current.scrollLeft);

    setIsScrolled(true);
    const { scrollLeft, clientWidth } = moviesRef.current;
    const offset =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    moviesRef.current.scrollTo({ left: offset, behavior: "smooth" });
  };

  return (
    <section aria-label="scrollable row">
      {movies.length !== 0 && (
        <div className="space-y-2.5 w-[89vw] max-w-screen-2xl mx-auto">
          <h2 className=" text-white/90 hover:text-white transition-colors text-base md:text-xl font-semibold ">
            {title ?? "-"}
          </h2>
          <div className=" group relative">
            <ChevronLeftIcon
              aria-label="scroll to right"
              className={`${
                isScrolled ? "block" : "hidden"
              } w-7 aspect-square text-white absolute top-1/3 left-2 cursor-pointer opacity-0 hover:scale-125 group-hover:opacity-100 transition-all`}
              onClick={() => scrollToPoint("left")}
            />
            <div
              ref={moviesRef}
              className="overflow-x-scroll scrollbar-thin flex space-x-2"
            >
              {movies.map((movie) => (
                <Image
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w500/${
                    movie.backdrop_path ?? movie.poster_path
                  }`}
                  alt={movie.title ?? "poster"}
                  width={250}
                  height={100}
                  className="w-full aspect-video object-cover rounded-sm"
                  loading="lazy"
                />
              ))}
            </div>
            <ChevronRightIcon
              aria-label="scroll to left"
              className="w-7 aspect-square text-white absolute top-1/3 right-2 cursor-pointer opacity-0 hover:scale-125 group-hover:opacity-100 transition-all"
              onClick={() => scrollToPoint("right")}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Row;
