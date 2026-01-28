import React from "react";

interface SeatGridProps {
  rowMap: Record<string, string[]>;
  available: string[];
  booked: string[];
  selectedSeats: string[];
  isSelected: boolean;
  handleSeatClick: (
    seat: string,
    isSelected: boolean,
    isBooked: boolean,
    isAvailable: boolean
  ) => void;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  rowMap,
  available,
  booked,
  selectedSeats,
  isSelected,
  handleSeatClick,
}) => (
  <div className="w-full flex justify-center">
    <div className="flex flex-col gap-1 mt-1 justify-center">
      {Object.entries(rowMap).map(([row, seatsInRow]) => (
        <div key={row} className="flex flex-wrap gap-2 justify-center">
          {seatsInRow.map((seat) => {
            const isAvailable = available.includes(seat);
            const isBooked = booked.includes(seat);
            const isSeatSelected = isSelected && selectedSeats.includes(seat);
            let seatClass =
              "inline-block w-10 text-center px-2 py-1 rounded text-xs font-semibold cursor-pointer ";
            if (isBooked) {
              seatClass += "bg-red-100 text-red-800 cursor-not-allowed";
            } else if (isSeatSelected) {
              seatClass += "bg-green-100 text-green-800";
            } else if (isAvailable) {
              seatClass += "bg-gray-100 text-gray-800";
            } else {
              seatClass += "bg-gray-50 text-gray-400";
            }
            return (
              <button
                type="button"
                key={seat}
                className={seatClass}
                onClick={() =>
                  handleSeatClick(seat, isSelected, isBooked, isAvailable)
                }
              >
                {seat}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);
