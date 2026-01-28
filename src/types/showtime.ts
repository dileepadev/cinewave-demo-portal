export interface Showtime {
  _id: string;
  movie_id: string;
  hall_id: string;
  start_time: string;
}

export interface AvailableSeats {
  showtime_id: string;
  available_seats: string[];
}

export interface BookedSeats {
  showtime_id: string;
  booked_seats: string[];
}
