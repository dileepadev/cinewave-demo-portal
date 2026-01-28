import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import FloatingChatButton from "../components/FloatingChatButton";
import Footer from "../components/Footer";
import { ToastNotification } from "@/components/ToastNotification";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CineWave - Movie Booking With AI",
  description:
    "A platform for booking movie tickets online with AI assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main className="main-container">
          <ToastNotification />
          {children}
        </main>
        <FloatingChatButton />
        <Footer />
      </body>
    </html>
  );
}
