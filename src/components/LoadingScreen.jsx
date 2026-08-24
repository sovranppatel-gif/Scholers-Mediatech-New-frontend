import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function LoadingScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) {
          return "";
        }
        return prev + ".";
      });
    }, 400); // Change dots every 400ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-[#48f0e7]/40 blur-md opacity-70" />
          <div className="relative bg-gradient-to-br from-[#091e27] via-[#1e5a68] to-[#48f0e7] p-1.5 rounded-xl shadow-[0_10px_40px_rgba(72,240,231,0.45)]">
            <img
              src={logo}
              alt="Scholars Mediatech"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </div>
        </div>
        <p className="text-white text-sm sm:text-base font-medium tracking-wide">
          Loading<span className="inline-block w-8 text-left">{dots}</span>
        </p>
      </div>
    </div>
  );
}
