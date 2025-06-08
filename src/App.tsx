import { lazy, Suspense, useState } from "react";
import SearchTerm from "./components/SearchTerm";
import TrendingMovies from "./components/TrendingMovies";

const MovieList = lazy(() => import("./components/MoviesList"));

function App() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <main className="bg-[url('./hero-bg.png')] bg-no-repeat bg-cover bg-center w-full min-h-screen">
        <div className="pattren"></div>
        <div className="wrapper px-4 sm:px-6 lg:px-8">
          <header className="text-center py-8 sm:py-12 lg:py-16">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mb-6 sm:mb-8">
              <img
                src="./hero.png"
                alt="hero banner"
                className="w-full h-auto object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-4">
              find <span className="text-gradient">movies</span> you'll enjoy
              without difficulties
            </h1>
          </header>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            <TrendingMovies />
            <SearchTerm searchTerm={search} setSearchTerm={setSearch} />
            <Suspense
              fallback={
                <div className="flex justify-center items-center py-12">
                  <h1 className="text-white text-lg sm:text-xl">Loading...</h1>
                </div>
              }
            >
              <MovieList searchTerm={search} />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
