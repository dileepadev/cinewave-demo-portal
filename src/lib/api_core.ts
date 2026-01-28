// CineWave Core API

import { apiDelete, apiFetch, apiPost } from "@/utils/api_core";
import { Movie, Hall } from "@/types/movie";
import { Showtime, AvailableSeats, BookedSeats } from "@/types/showtime";
import { CreateBooking, Booking } from "@/types/booking";

// Movies

export async function getMovies(): Promise<Movie[]> {
  return apiFetch<Movie[]>("/movies");
}

export async function getMovieById(id: string): Promise<Movie> {
  return apiFetch<Movie>(`/movies/${id}`);
}

// Halls

export async function getHalls(): Promise<Hall[]> {
  return apiFetch<Hall[]>("/halls");
}

// Showtimes

export async function getShowtimes(): Promise<Showtime[]> {
  return apiFetch<Showtime[]>("/showtimes");
}

export async function getAvailableSeats(
  showtimeId: string
): Promise<AvailableSeats> {
  return apiFetch<AvailableSeats>(`/showtimes/${showtimeId}/available-seats`);
}

export async function getBookedSeats(showtimeId: string): Promise<BookedSeats> {
  return apiFetch<BookedSeats>(`/showtimes/${showtimeId}/booked-seats`);
}

// Bookings

export async function createBooking(
  createBooking: CreateBooking
): Promise<void> {
  return apiPost<void>("/bookings", createBooking);
}

export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  return apiFetch<Booking[]>(`/bookings/user/${userId}`);
}

export async function deleteBooking(
  bookingId: string
): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/bookings/${bookingId}`);
}
