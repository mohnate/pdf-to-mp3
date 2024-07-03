"use client";
import gsap from "gsap";
import { cn } from "../utils/cn";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import React, { FC, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface HeroPrrops {
  generateSpeechRef: React.RefObject<HTMLDivElement>;
}
export const Hero: FC<HeroPrrops> = ({ generateSpeechRef }) => {
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

  const handleScroll = () => {
    generateSpeechRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-full mx-auto overflow-hidden relative h-[500px] bg-blurry rounded-b-3xl shadow-2xl">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col flex-1 justify-center h-full lg:w-1/2 p-8 pb-0">
          <p
            ref={heroTextRef1}
            className="text-2xl text-balance md:text-4xl lg:text-8xl font-thin"
          >
            Conversational Voice AI Bots,{" "}
          </p>
          <p
            ref={heroTextRef2}
            className="text-base md:text-lg mt-4 text-gray-500 font-extralight"
          >
            Convert your text and PDF documents into MP3 audio files easily.
            Choose from a variety of AI voices to suit your needs and enjoy
            listening to your documents on the go.
            <span className="text-[#3fcfa4]">
              Type it, convert it, download it – it&apos;s that easy!
            </span>
          </p>
          <button
            onClick={handleScroll}
            className="w-[200px] hover:bg-[#3fcfa4] hover:text-black transition duration-700 text-[#3fcfa4] rounded-full border border-[#3fcfa4] my-5 py-2 px-4 flex items-center gap-2 justify-center"
          >
            Learn more
            <IoIosArrowDown />
          </button>
        </div>

        <Image
          src="/hero-bg.avif"
          alt="banner"
          objectFit="cover"
          width={500}
          height={500}
          className="rounded-b-3xl lg:rounded-none w-full"
        />
      </div>
    </div>
  );
};
