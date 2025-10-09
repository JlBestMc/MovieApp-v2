import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "@/config/tmdb";
import Navbar from "@/features/header/components/navbar/Navbar";
import logo2 from "@/assets/white-logo.svg";
import { Bookmark } from "lucide-react";
import { List } from "lucide-react";
import { Heart } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Crew {
  id: number;
  name: string;
  job: string;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  vote_average: number;
  tagline: string;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
}

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        setLoading(true);
        const details = await fetchMovieDetails(id);
        setMovie(details);
      } catch (error) {
        console.error("Error loading movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
        <p className="text-xl">Cargando...</p>
      </div>
    );

  if (!movie)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
        <p className="text-xl">Película no encontrada</p>
      </div>
    );

  const getDirector = () => {
    return (
      movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
      "N/A"
    );
  };

  const getWriter = () => {
    const writerJobs = [
      "Writer",
      "Screenplay",
      "Story",
      "Screenwriter",
      "Novel",
    ];
    const writer = movie.credits?.crew?.find((person) =>
      writerJobs.includes(person.job)
    );

    return writer?.name || "N/A";
  };

  const getProducer = () => {
    return (
      movie.credits?.crew?.find((person) => person.job === "Producer")?.name ||
      "N/A"
    );
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar
        logo={logo2}
      />
      <div
        className="min-h-screen text-white relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.64) 100%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-2xl w-80 h-full"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                {movie.title}{" "}
                <span className="text-gray-300 font-normal">
                  ({movie.release_date?.split("-")[0]})
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                <span className="border border-gray-400 px-2 py-1 rounded">
                  {movie.status === "Released" ? "12" : "NR"}
                </span>
                <span>{formatDate(movie.release_date)}</span>
                <span>•</span>
                <span>
                  {movie.genres?.map((genre) => genre.name).join(", ")}
                </span>
                <span>•</span>
                <span>{formatRuntime(movie.runtime)}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-black">
                    <span className="text-white font-bold text-sm">
                      {Math.round(movie.vote_average * 10)}%
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">User</p>
                    <p className="text-white font-semibold">Score</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="w-10 h-10 text-3xl cursor-pointer hover:scale-125 bg-[#00000055] rounded-full transition-transform ">
                    😍
                  </span>
                  <span className="w-10 h-10 text-3xl cursor-pointer hover:scale-125 bg-[#00000055] rounded-full transition-transform ">
                    😊
                  </span>
                  <span className="w-10 h-10 text-3xl cursor-pointer hover:scale-125 bg-[#00000055] rounded-full transition-transform ">
                    😐
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <button className="w-10 h-10 bg-[#0d253f] rounded-full flex items-center justify-center hover:bg-gray-700">
                  <span className="text-white">
                    <List size={20} />
                  </span>
                </button>
                <button className="w-10 h-10 bg-[#0d253f] rounded-full flex items-center justify-center hover:bg-gray-700">
                  <span className="text-white">
                    <Heart size={20} />
                  </span>
                </button>
                <button className="w-10 h-10 bg-[#0d253f] rounded-full flex items-center justify-center hover:bg-gray-700">
                  <span className="text-white">
                    <Bookmark size={20} />
                  </span>
                </button>
              </div>

              <p className="text-gray-300 italic text-lg mb-4">
                {movie.tagline}
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-gray-200 leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="font-semibold text-white">{getDirector()}</p>
                  <p className="text-gray-400 text-sm">Director</p>
                </div>
                <div>
                  <p className="font-semibold text-white">{getWriter()}</p>
                  <p className="text-gray-400 text-sm">Writer</p>
                </div>
                <div>
                  <p className="font-semibold text-white">{getProducer()}</p>
                  <p className="text-gray-400 text-sm">Producer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Top Billed Cast</h2>
            <div
              className="flex gap-4 overflow-x-auto pb-4 pl-2 pt-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 255, 255, 0.5) transparent",
              }}
            >
              {movie.credits?.cast?.slice(0, 10).map((actor) => (
                <Link
                  key={actor.id}
                  to={`/actor/${actor.id}`}
                  className="min-w-[150px] bg-white rounded-xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={actor.name}
                    className="w-full h-48 object-cover rounded-xl p-0.5"
                  />
                  <div className="p-3">
                    <p className="font-semibold text-black text-sm">
                      {actor.name}
                    </p>
                    <p className="text-gray-600 text-xs">{actor.character}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
