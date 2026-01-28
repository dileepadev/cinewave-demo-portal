import React from "react";
import { SeatGrid } from "./SeatGrid";
import type { Hall } from "@/types/movie";
import type { Showtime } from "@/types/showtime";

interface ShowtimeItemProps {
  showtime: Showtime;
  hall: Hall | undefined;
  available: string[];
  booked: string[];
  rowMap: Record<string, string[]>;
  isSelected: boolean;
  selectedSeats: string[];
  handleSeatClick: (
    seat: string,
    isSelected: boolean,
    isBooked: boolean,
    isAvailable: boolean
  ) => void;
  onSelect: () => void;
}

export const ShowtimeItem: React.FC<ShowtimeItemProps> = ({
  showtime,
  hall,
  available,
  booked,
  rowMap,
  isSelected,
  selectedSeats,
  handleSeatClick,
  onSelect,
}) => (
  <li
    key={showtime._id}
    className={`p-4 rounded-lg shadow-lg overflow-hidden hover:scale-100 transition-transform duration-200 ${
      isSelected ? "ring-2 ring-green-400" : ""
    }`}
  >
    <div>
      <span className="font-semibold">Start Time:</span>{" "}
      {new Date(showtime.start_time).toLocaleString()}
    </div>
    <div>
      <span className="font-semibold">Hall:</span> {hall?.name ?? "-"}
    </div>
    <div className="mt-2">
      <button
        type="button"
        className={`mb-4 px-3 py-1 rounded cursor-pointer ${
          isSelected
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
        onClick={onSelect}
      >
        {isSelected ? "Selected" : "Select Showtime"}
      </button>
      {/* Screen visual */}
      <div className="w-full flex justify-center items-center mb-4">
        <div className="h-8 w-full bg-gray-300 rounded-b-lg flex items-center justify-center text-gray-700 font-semibold text-base shadow-inner">
          SCREEN
        </div>
      </div>
      {/* Seats grid */}
      <SeatGrid
        rowMap={rowMap}
        available={available}
        booked={booked}
        selectedSeats={selectedSeats}
        isSelected={isSelected}
        handleSeatClick={handleSeatClick}
      />
      {/* Legend */}
      <div className="mt-4 flex gap-4 text-xs">
        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded">
          Available
        </span>
        <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded">
          Booked
        </span>
        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">
          Selected
        </span>
      </div>
    </div>
  </li>
);
