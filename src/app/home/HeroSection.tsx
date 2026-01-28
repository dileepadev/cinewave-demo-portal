import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-cw-primary to-cw-white dark:from-cw-gray-900 dark:to-cw-white">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 cw-gray-900">
        Welcome to the <span className="cw-primary"> Future of AI-Powered</span>{" "}
        Cinema
      </h1>
      <p className="text-lg md:text-2xl mb-8 cw-gray-700 max-w-2xl">
        Discover, book, and enjoy the latest movies in your favorite halls.
        Experience cinema like never before with seamless ticketing and
        exclusive features.
      </p>
    </section>
  );
};

export default HeroSection;
