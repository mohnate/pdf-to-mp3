"use client";
import gsap from "gsap";
import { cn } from "../utils/cn";
import { WavyBackground } from "./ui/wavy-background";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroTextRef1 = useRef(null);
  const heroTextRef2 = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      [heroTextRef1.current, heroTextRef2.current],
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: [heroTextRef1.current, heroTextRef2.current],
          start: "top bottom",
        },
      }
    );
  });

  return (
    <div className="max-w-full mx-auto overflow-hidden relative">
      <WavyBackground className="absolute">
        <p
          ref={heroTextRef1}
          className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center"
        >
          Turn your words into music with a click!
        </p>
        <p
          ref={heroTextRef2}
          className="text-base md:text-lg mt-4 text-white font-normal text-center"
        >
          Type it, convert it, download it – it's that easy!
        </p>
      </WavyBackground>
    </div>
  );
}
