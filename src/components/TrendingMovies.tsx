import { useEffect, useState } from "react";
import { getTrendingMovies } from "../appwrite";
import { Models } from "appwrite";

function TrendingMovies() {
  const [error, setError] = useState<string>("");
  const [trendingMovies, setTrendingMovies] = useState<Models.Document[]>([]); // Specify the array type here
  const [loading, setLoading] = useState(true);
  const loadTrendingMovies = async () => {
    try {
      // Fetching the trending movies
      const movies = await getTrendingMovies();
      if (movies) {
        setTrendingMovies(movies);
        setLoading(false);
      } else {
        setError("Failed to load trending movies");
        setLoading(false);
      }
      // Assuming the response is an array of `MovieData`
      console.log(error);
      console.log(movies);
    } catch (error: unknown) {
      // Handle errors
      if (error instanceof Error) {
        console.log(error);
        setError(error.message); // Now TypeScript knows about `message`
      } else {
        console.log("An unknown error occurred");
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  if (loading) {
    return <LoaderTrendingMovies />;
  }
  return (
    <>
      <section className="trending">
        <h2>Trending Movies</h2>
        <ul>
          {trendingMovies.map((movie, index) => {
            return (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie?.poster_url} />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default TrendingMovies;

const LoaderTrendingMovies = () => {
  return (
    <>
      <div className="flex gap-2">
        <div className="movie-card-loader animate-pulse">
          <div className="bg-gray-700 w-full h-72 rounded-md"></div>
          <div className="mt-4">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          </div>
        </div>
        <div className="movie-card-loader animate-pulse">
          <div className="bg-gray-700 w-full h-72 rounded-md"></div>
          <div className="mt-4">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          </div>
        </div>
        <div className="movie-card-loader animate-pulse">
          <div className="bg-gray-700 w-full h-72 rounded-md"></div>
          <div className="mt-4">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          </div>
        </div>
        <div className="movie-card-loader animate-pulse">
          <div className="bg-gray-700 w-full h-72 rounded-md"></div>
          <div className="mt-4">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          </div>
        </div>
        <div className="movie-card-loader animate-pulse">
          <div className="bg-gray-700 w-full h-72 rounded-md"></div>
          <div className="mt-4">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};
