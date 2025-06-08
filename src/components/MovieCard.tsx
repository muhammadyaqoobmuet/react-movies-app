
import { Movie } from "./MoviesList";

function MovieCard({
  movie: {
    title,
    poster_path,
    vote_average,
    original_language,
    release_date,
  },
}: {
  movie: Movie;
}) {
  return (
    <div className="movie-card text-whtie">
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />

      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="staricom" />
            {vote_average && <p>{vote_average.toFixed(1)}</p>}
          </div>
          <span>•</span>

          {original_language && (
            <p className="text-white">{original_language}</p>
          )}

          <span>•</span>
          <div className="year">{release_date?.split("-")[0]}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
