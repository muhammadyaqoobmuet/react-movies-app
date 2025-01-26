import { lazy, Suspense, useState } from "react";
import SearchTerm from "./components/SearchTerm";
import TrendingMovies from "./components/TrendingMovies";

const MovieList = lazy(() => import("./components/MoviesList"));

// Correcting the function declaration and returning the fetched data

function App() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <main className="bg-[url('./hero-bg.png')] bg-no-repeat   h-auto">
        <div className="pattren"></div>
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero banner" />
            <h1>
              find <span className="text-gradient">movies</span> you'll enjoy
              without difficulties
            </h1>
          </header>
          <TrendingMovies />
          <SearchTerm searchTerm={search} setSearchTerm={setSearch} />
          <Suspense fallback={<h1>Loading</h1>}>
            <MovieList searchTerm={search} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

export default App;
