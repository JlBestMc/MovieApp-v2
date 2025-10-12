import { Link } from "react-router-dom";
import type { Movie } from "../../types/movieTypes";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : undefined;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div
        className="group relative w-full h-[400px] lg:h-[479px] rounded-[1.5em] overflow-hidden shadow-2xl flex flex-col p-6"
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundColor: "#111111" }
        }
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 transition-colors bg-gradient-to-b from-black/5 via-black/10 to-black/70 duration-300 group-hover:bg-[#111111]/35" />

        {/* Subtle bottom gradient for readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Rating badge */}
        {typeof movie.vote_average === "number" && (
          <div className="absolute top-3 right-3 z-[2]">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 text-white text-xs px-2 py-1 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-yellow-300">
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.897l-7.335 3.868 1.401-8.168L.132 9.21l8.2-1.192L12 .587z"/>
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        )}

        {/* Bottom content */}
        <div className="relative z-[2] mt-auto">
          <div className="text-white flex flex-col gap-1">
            <h3
              className="text-lg md:text-xl font-semibold tracking-wide text-white"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
              title={movie.title}
            >
              {movie.title}
            </h3>
            {year && (
              <p className="text-xs md:text-sm font-semibold opacity-90">
                {year}
              </p>
            )}
          </div>
          {movie.overview && (
            <p className="mt-2 text-sm text-white/90 max-h-0 overflow-hidden transition-[max-height] duration-500 ease-out group-hover:max-h-28">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
