export interface Movie {
  _id: string;
  title: string;
  description: string;
  release_date: string;
  poster: string;
  duration: number;
  genre: string[];
  language: string;
  rating: string;
}

export interface Hall {
  _id: string;
  name: string;
  seats: string[];
}
