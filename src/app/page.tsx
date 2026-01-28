"use client";
import MoviesList from "./home/MoviesList";
import HeroSection from "./home/HeroSection";
import HallsList from "./home/HallsList";

export default function Home() {
  return (
    <div>
      <main className="">
        <HeroSection />
        <MoviesList />
        <HallsList />
      </main>
    </div>
  );
}
