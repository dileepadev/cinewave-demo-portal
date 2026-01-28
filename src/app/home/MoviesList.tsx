import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getMovies } from "@/lib/api_core";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center cw-gray-900">
        Movies Showing
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:scale-102 transition-transform duration-200"
          >
            <Image
              src={movie.poster}
              alt={movie.title}
              className="w-full object-cover"
              priority
              width={1031}
              height={1528}
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold mb-1 cw-gray-900">
                {movie.title}
              </h3>
              <p className="text-sm cw-gray-400 mb-2">{movie.release_date}</p>
              <p className="text-sm cw-gray-400 mb-2">
                {movie.genre.join(", ")}
              </p>
              <p className="text-sm cw-gray-700 mb-2 line-clamp-3">
                {movie.description}
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs cw-gray-400">{movie.language}</span>
                <span className="text-xs font-bold cw-yellow-500">
                  ⭐ {movie.rating}
                </span>
              </div>
              <button
                type="button"
                className="mt-4 cw-gray-900-bg cw-white font-semibold py-2 px-4 rounded hover:cw-gray-900 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  router.push(`/movie?id=${encodeURIComponent(movie._id)}`);
                }}
              >
                Buy Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
