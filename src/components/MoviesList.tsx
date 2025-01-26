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
  }, 1000); // Delay of 900ms

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
        Authorization: `Bearer ${configFile.header}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (searchTerm && data.results.length > 0) {
        await updateSearch(searchTerm, data.results[0]);
      }
      return data; // Return the fetched data to the query
    } catch (err) {
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
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  return (
    <div className="bg-transparent w-full pt-20">
      <p className="text-white text-3xl font-bold px-4 py-2">ALL MOVIES</p>
      <div className="grid grid-cols-4 justify-center mx-auto gap-10 p-2 max-w-[1400px]">
        {data?.results?.map((movie: Movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default MoviesList;
