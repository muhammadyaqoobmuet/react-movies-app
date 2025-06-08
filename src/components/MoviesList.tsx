import { useQuery } from "@tanstack/react-query";
import { configFile } from "../config/config";
import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import debounce from "debounce";
import { updateSearch } from "../appwrite";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface movieData {
  pages: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface SearchTermProps {
  readonly searchTerm: string;
}

const MoviesList: React.FC<SearchTermProps> = ({ searchTerm }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce function for search term
  const debouncedSearch = debounce((term: string) => {
    setDebouncedSearchTerm(term);
  }, 1000); // Delay of 1000ms

  // Effect to apply the debounced search term whenever the searchTerm prop changes
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  async function fetchMovies() {
    const url = debouncedSearchTerm
      ? `https://api.themoviedb.org/3/search/movie?query=${debouncedSearchTerm}`
      : "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

    
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${
          configFile.header || import.meta.env.VITE_TMDB_API_KEY
        }`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (searchTerm && data.results.length > 0) {
        await updateSearch(searchTerm, data.results[0]);
      }
      return data; // Return the fetched data to the query
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong while fetching movies.");
    }
  }

  // Query to fetch movies with debounced search term
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", debouncedSearchTerm],
    queryFn: fetchMovies,
    enabled: true, // Always enabled so it fetches even without a search term
    staleTime: 3000,
  });

  if (isLoading) {
    // If loading, show the loader
    return <Loader />;
  }

  // If there's an error, display the error message
  if (isError) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-500 text-center px-4">
          <p className="text-lg sm:text-xl font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-sm sm:text-base">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full bg-transparent pt-12 sm:pt-16 lg:pt-20 pb-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 lg:mb-10">
          ALL MOVIES
        </h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center max-w-[2000px] mx-auto">
          {data?.results?.map((movie: Movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>

        {/* No Results Message */}
        {data?.results?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-lg sm:text-xl">
              No movies found{searchTerm ? ` for "${searchTerm}"` : ""}
            </p>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MoviesList;
