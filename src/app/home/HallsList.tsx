import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getHalls } from "@/lib/api_core";
import { Hall } from "@/types/movie";
import {
  FaVolumeUp,
  FaTv,
  FaVideo,
  FaWheelchair,
  FaCouch,
} from "react-icons/fa";

export default function HallsList() {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHalls()
      .then(setHalls)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center cw-gray-900">
        Cinema Halls
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {halls.map((hall) => (
          <div
            key={hall._id}
            className="cw-bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:scale-102 transition-transform duration-200"
          >
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-semibold mb-2 cw-gray-900">
                {hall.name}
              </h3>
              {/* Hardcoded cool features */}
              <div className="flex flex-wrap gap-3 mb-4 text-sm">
                <span className="flex items-center gap-1 cw-gray-700">
                  <FaVolumeUp /> Dolby Atmos
                </span>
                <span className="flex items-center gap-1 cw-gray-700">
                  <FaTv /> 18m x 8m
                </span>
                <span className="flex items-center gap-1 cw-gray-700">
                  <FaVideo /> 4K Laser
                </span>
                <span className="flex items-center gap-1 cw-gray-700">
                  <FaWheelchair /> Wheelchair Access
                </span>
                <span className="flex items-center gap-1 cw-gray-700">
                  <FaCouch /> Recliner Seats
                </span>
              </div>
              <p className="cw-gray-700 mb-2">
                Total Seats: {hall.seats.length}
              </p>
              <div className="flex flex-wrap gap-1 text-xs cw-gray-400">
                {hall.seats.slice(0, 20).map((seat) => (
                  <span
                    key={seat}
                    className="cw-bg-white cw-border-gray-200 border rounded px-2 py-1 mb-1"
                  >
                    {seat}
                  </span>
                ))}
                {hall.seats.length > 20 && (
                  <span className="ml-2 cw-gray-700">
                    ...and {hall.seats.length - 20} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
