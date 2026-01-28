"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  getMovieById,
  getShowtimes,
  getAvailableSeats,
  getHalls,
  getBookedSeats,
  createBooking,
} from "@/lib/api_core";
import type { Movie, Hall } from "@/types/movie";
import type { Showtime, AvailableSeats } from "@/types/showtime";
import Image from "next/image";
import { ShowtimeItem } from "@/components/ShowtimeItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import { user001 } from "@/data/exampleUser";
import { currentTicketPrice } from "@/data/pricing";

// Helper to group seats by row
function groupSeatsByRow(seats: string[]): Record<string, string[]> {
  return seats.reduce((acc, seat) => {
    const row = seat[0];
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, string[]>);
}

export default function MoviePage() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [seats, setSeats] = useState<Record<string, AvailableSeats>>({});
  const [halls, setHalls] = useState<Hall[]>([]);
  const [bookedSeats, setBookedSeats] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(
    null
  );
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    Promise.all([getMovieById(movieId), getShowtimes(), getHalls()])
      .then(async ([movieData, allShowtimes, hallsData]) => {
        setMovie(movieData);
        setHalls(hallsData);
        const filteredShowtimes = allShowtimes.filter(
          (s) => s.movie_id === movieId
        );
        setShowtimes(filteredShowtimes);
        // Fetch available and booked seats for each showtime
        const seatsData: Record<string, AvailableSeats> = {};
        const bookedSeatsData: Record<string, string[]> = {};
        await Promise.all(
          filteredShowtimes.map(async (showtime) => {
            try {
              seatsData[showtime._id] = await getAvailableSeats(showtime._id);
              const booked = await getBookedSeats(showtime._id);
              bookedSeatsData[showtime._id] = booked.booked_seats;
            } catch {
              seatsData[showtime._id] = {
                showtime_id: showtime._id,
                available_seats: [],
              };
              bookedSeatsData[showtime._id] = [];
            }
          })
        );
        setSeats(seatsData);
        setBookedSeats(bookedSeatsData);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching movie details:", err);
        setError("Failed to load movie details.");
        setLoading(false);
      });
  }, [movieId]);

  const handleSeatClick = (
    seat: string,
    isSelected: boolean,
    isBooked: boolean,
    isAvailable: boolean
  ) => {
    if (!isSelected || isBooked || !isAvailable) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  if (!movieId) return <div>No movie selected.</div>;
  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">{movie.title}</h1>
        <div className="flex flex-row gap-6 items-start mb-4">
          <Image
            src={movie.poster}
            alt={movie.title}
            className="w-64 rounded shadow-lg"
            width={256}
            height={384}
          />
          <div className="flex-1">
            <p className="mb-2 text-gray-700">{movie.description}</p>
            <div className="mb-2">
              <span className="font-semibold">Release Date:</span>{" "}
              {movie.release_date}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Duration:</span> {movie.duration}{" "}
              min
            </div>
            <div className="mb-2">
              <span className="font-semibold">Genre:</span>{" "}
              {movie.genre.join(", ")}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Language:</span> {movie.language}
            </div>
            <div className="mb-8">
              <span className="font-semibold">Rating:</span> {movie.rating}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-lg">Ticket Price:</span>{" "}
              <span className="text-2xl font-bold cw-primary">
                LKR {currentTicketPrice}/=
              </span>
            </div>
          </div>
        </div>
        <hr className="my-8 border-t cw-hr-gray" />
        <h2 className="text-2xl font-semibold mt-6 mb-4">Showtimes</h2>
        {showtimes.length === 0 ? (
          <p>No showtimes available for this movie.</p>
        ) : (
          <ul className="space-y-4">
            {showtimes.map((showtime) => {
              const hall = halls.find((h) => h._id === showtime.hall_id);
              const allSeats = hall?.seats || [];
              const available = seats[showtime._id]?.available_seats || [];
              const booked = bookedSeats[showtime._id] || [];
              const isSelected = selectedShowtimeId === showtime._id;
              const rowMap = groupSeatsByRow(allSeats);
              return (
                <ShowtimeItem
                  key={showtime._id}
                  showtime={showtime}
                  hall={hall}
                  available={available}
                  booked={booked}
                  rowMap={rowMap}
                  isSelected={isSelected}
                  selectedSeats={selectedSeats}
                  handleSeatClick={handleSeatClick}
                  onSelect={() => {
                    setSelectedShowtimeId(showtime._id);
                    setSelectedSeats([]);
                  }}
                />
              );
            })}
          </ul>
        )}
        {/* Show Total Price Count */}
        <div className="flex justify-center mt-6 mb-2">
          <span className="text-lg font-semibold">
            Total Price:{" "}
            <span className="text-2xl font-bold cw-primary">
              LKR {selectedSeats.length * currentTicketPrice}/=
            </span>
          </span>
        </div>

        {/* Book Tickets Button */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="cw-primary-bg cw-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={!selectedShowtimeId || selectedSeats.length === 0}
            onClick={async () => {
              if (!selectedShowtimeId || selectedSeats.length === 0) return;
              const toastId = toast.loading("Booking in progress...");
              const booking = {
                showtime_id: selectedShowtimeId,
                user_id: user001._id, // Example user ID, replace with actual user ID
                seats: Object.fromEntries(
                  selectedSeats.map((seat, idx) => [idx, seat])
                ),
                status: "booked" as const,
              };
              try {
                await createBooking(booking);
                toast.success("Booking successful!", { id: toastId });
                setSelectedSeats([]);
              } catch (err) {
                console.error("Booking failed:", err);
                toast.error("Booking failed. Please try again.", {
                  id: toastId,
                });
              }
            }}
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
