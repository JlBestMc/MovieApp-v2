import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchActorDetails, fetchActorMovies } from "@/config/tmdb";
import Navbar from "@/features/header/components/navbar/Navbar";
import logo2 from "@/assets/white-logo.svg";

interface ActorDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
  gender: number;
  also_known_as: string[];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  character: string;
}

export default function ActorDetailsPage() {
  const { id } = useParams();
  const [actor, setActor] = useState<ActorDetails | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        setLoading(true);
        const [actorData, moviesData] = await Promise.all([
          fetchActorDetails(id),
          fetchActorMovies(id),
        ]);
        setActor(actorData);
        setMovies(moviesData.slice(0, 12));
      } catch (error) {
        console.error("Error loading actor details:", error);
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

  if (!actor)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
        <p className="text-xl">Actor no encontrado</p>
      </div>
    );

  const getAge = () => {
    if (!actor.birthday) return "N/A";
    const birthDate = new Date(actor.birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getGender = () => {
    return actor.gender === 1 ? "Female" : actor.gender === 2 ? "Male" : "N/A";
  };

  return (
    <>
      <Navbar
        logo={logo2}
      />
      <div className="min-h-screen bg-white text-black overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={actor.name}
                className="rounded-lg shadow-lg w-full max-w-80 h-auto mx-auto lg:mx-0"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 break-words">
                {actor.name}
              </h1>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Biography</h2>
                <div className="max-h-40 overflow-y-auto pr-2">
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {actor.biography || "No biography available."}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Known For</h2>
                <div className="overflow-x-hidden pl-2">
                  <div
                    className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-2 px-2"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(0, 0, 0, 0.5) transparent",
                    }}
                  >
                    {movies.map((movie) => (
                      <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        className="block min-w-[120px] hover:scale-105 transition-transform"
                      >
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                              : "https://via.placeholder.com/200x300?text=No+Image"
                          }
                          alt={movie.title}
                          className="rounded-lg shadow-md h-44 object-cover"
                        />
                        <p className="text-sm font-medium mt-2 text-center">
                          {movie.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-300 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Personal Info</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-1">
                  Known For
                </h4>
                <p className="text-gray-700 text-md">
                  {actor.known_for_department}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-1">
                  Known Credits
                </h4>
                <p className="text-gray-700 text-md">{movies.length}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-1">
                  Gender
                </h4>
                <p className="text-gray-700 text-md">{getGender()}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-1">
                  Birthday
                </h4>
                <p className="text-gray-700 text-md">
                  {formatDate(actor.birthday)} ({getAge()} years old)
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-1">
                  Place of Birth
                </h4>
                <p className="text-gray-700 text-md">
                  {actor.place_of_birth || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
