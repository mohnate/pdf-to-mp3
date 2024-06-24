"use client";
import { cn } from "../utils/cn";
import { WavyBackground } from "./ui/wavy-background";

export function Hero() {
  return (
    <div className="max-w-full mx-auto overflow-hidden relative">
      <WavyBackground className="absolute">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center">
          Turn your words into music with a click!
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal text-center">
          Type it, convert it, download it – it's that easy!
        </p>
      </WavyBackground>
    </div>
  );
}
