import { Movie } from "./MoviesList";

function MovieCard({
  movie: { title, poster_path, vote_average, original_language, release_date },
}: {
  movie: Movie;
}) {
  return (
    <article className="movie-card w-full max-w-[280px] bg-gray-900/50 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-900/70">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "/placeholder-movie.jpg" // Fallback image
          }
          alt={title || "Movie poster"}
          loading="lazy"
        />

        {/* Rating Badge */}
        {vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <img
              src="star.svg"
              alt="rating"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            <span className="text-yellow-400 text-xs sm:text-sm font-semibold">
              {vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg leading-tight mb-2 sm:mb-3 line-clamp-2 hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Movie Details */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Language */}
            {original_language && (
              <>
                <span className="uppercase bg-gray-700 px-2 py-1 rounded text-xs font-medium">
                  {original_language}
                </span>
                <span className="text-gray-500">•</span>
              </>
            )}

            {/* Release Year */}
            {release_date && (
              <span className="text-gray-400 font-medium">
                {release_date.split("-")[0]}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Rating (Alternative Layout for Mobile) */}
        <div className="mt-2 sm:hidden flex items-center gap-1">
          {vote_average > 0 && (
            <>
              <img src="star.svg" alt="rating" className="w-3 h-3" />
              <span className="text-yellow-400 text-xs font-semibold">
                {vote_average.toFixed(1)}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
