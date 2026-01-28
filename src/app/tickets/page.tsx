"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  getBookingsByUser,
  getMovieById,
  getShowtimes,
  deleteBooking,
} from "@/lib/api_core";
import { Booking } from "@/types/booking";
import { Showtime } from "@/types/showtime";
import { Movie } from "@/types/movie";
import { user001 } from "@/data/exampleUser";
import Image from "next/image";
import { currentTicketPrice } from "@/data/pricing";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toSriLankaTime } from "@/utils/time";
import toast from "react-hot-toast";

export default function TicketsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showtimes, setShowtimes] = useState<Record<string, Showtime>>({});
  const [movies, setMovies] = useState<Record<string, Movie>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const bookingsData = await getBookingsByUser(user001._id);
        setBookings(bookingsData);
        const showtimeIds = Array.from(
          new Set(bookingsData.map((b) => b.showtime_id))
        );
        const allShowtimes = await getShowtimes();
        const showtimeMap: Record<string, Showtime> = {};
        allShowtimes.forEach((st) => {
          if (showtimeIds.includes(st._id)) showtimeMap[st._id] = st;
        });
        setShowtimes(showtimeMap);
        const movieIds = Array.from(
          new Set(Object.values(showtimeMap).map((st) => st.movie_id))
        );
        const movieMap: Record<string, Movie> = {};
        await Promise.all(
          movieIds.map(async (id) => {
            movieMap[id] = await getMovieById(id);
          })
        );
        setMovies(movieMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tickets");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const res = await deleteBooking(bookingId);
      toast.success(res.message || "Booking deleted successfully.");
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to delete booking";
      toast.error(errorMsg);
    }
  };

  const totalMoviesBooked = new Set(
    bookings
      .map((booking) => {
        const showtime = showtimes[booking.showtime_id];
        return showtime ? showtime.movie_id : null;
      })
      .filter(Boolean)
  ).size;

  const totalTicketPrice = bookings.reduce(
    (sum, booking) =>
      sum + currentTicketPrice * Object.keys(booking.seats).length,
    0
  );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Your Tickets</h1>
      <p className="mb-6">View and manage your booked movie tickets here.</p>
      {/* Summary Section */}
      {!loading && !error && bookings.length > 0 && (
        <div className="mb-6 flex flex-row gap-8 text-base font-medium">
          <div>
            Total Movies Booked:{" "}
            <span className="font-bold">{totalMoviesBooked}</span>
          </div>
          <div>
            Total Ticket Price:{" "}
            <span className="font-bold">{totalTicketPrice} LKR</span>
          </div>
        </div>
      )}
      {loading && <LoadingSpinner />}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && bookings.length === 0 && (
        <div>No tickets booked yet.</div>
      )}
      <div className="space-y-6">
        {bookings.map((booking) => {
          const showtime = showtimes[booking.showtime_id];
          const movie = showtime ? movies[showtime.movie_id] : undefined;
          return (
            <div
              key={booking._id}
              className="rounded-lg p-4 shadow-sm bg-white flex flex-col md:flex-row md:items-center md:justify-between hover:scale-102 transition-transform duration-200"
            >
              {/* Poster and details */}
              <div className="flex flex-row items-center flex-1 gap-6">
                {movie && (
                  <div className="mb-4 md:mb-0 flex-shrink-0 w-24 h-36 relative">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      className="object-cover rounded"
                      sizes="96px"
                    />
                  </div>
                )}
                <div className="ml-0">
                  <div className="font-semibold text-lg">
                    {movie ? movie.title : "Movie"}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    Showtime:{" "}
                    {showtime ? toSriLankaTime(showtime.start_time) : "-"}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    Seats: {Object.values(booking.seats).join(", ")}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    Status:{" "}
                    <span className="font-medium capitalize">
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm mb-3">
                    Booked at: {toSriLankaTime(booking.booking_time)}
                  </div>
                  <div className="flex flex-row gap-2 mt-2">
                    <button
                      type="button"
                      className="cw-icon-btn"
                      title="Edit Booking"
                      onClick={() => {
                        console.log("Edit booking", booking._id);
                      }}
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      type="button"
                      className="cw-icon-btn cw-icon-btn-delete"
                      title="Delete Booking"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              {/* Price */}
              <div className="font-semibold text-base text-right min-w-[80px] md:ml-4 mt-4 md:mt-0">
                {currentTicketPrice * Object.keys(booking.seats).length} LKR
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
