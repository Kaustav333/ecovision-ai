import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Full-viewport scenic EcoVision artwork background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/eco-bg.jpg')" }}
      />
      {/* Gentle luminous atmospheric tint to preserve contrast across all pages */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-gradient-to-b from-[#f4fcf5]/62 via-[#f7fcf8]/48 to-[#e6f6e9]/58 pointer-events-none"
      />

      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
