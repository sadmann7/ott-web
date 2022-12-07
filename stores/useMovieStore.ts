import create from "zustand";

// types import
import { Movie } from "@/types/types";

type MovieStoreProps = {
  movie: null | Movie;
  setMovie: (currentMovie: Movie | null) => void;
};

export const useMovieStore = create<MovieStoreProps>((set) => ({
  movie: null,
  setMovie: (currentMovie) => set((state) => ({ movie: currentMovie })),
}));
