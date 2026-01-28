export interface CreateBooking {
  showtime_id: string;
  user_id: string;
  seats: Record<number, string>;
  status: "booked";
}

export interface Booking {
  _id: string;
  showtime_id: string;
  user_id: string;
  seats: Record<string, string>;
  status: "booked";
  booking_time: string;
}
