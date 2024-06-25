"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, yPercent: -50 },
      {
        opacity: 1,
        yPercent: 0,
        ease: "expo.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "bottom top",
          end: "+=200",
        },
      }
    );
  });

  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 bg-black text-white p-4 m-10 rounded-full">
      <div className="container relative mx-auto flex justify-between items-center px-4 ">
        <div className="flex items-center cursor-pointer hover:text-purple-400 transition duration-300">
          <Image src="/favicon.ico" alt="logo" width={32} height={32} />
          <h1 className="md:text-2xl font-bold  ml-2">PDF to MP3 Generator</h1>
        </div>
        <div className="flex space-x-4">
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-purple-400 transition duration-300">
            Button
          </button>
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-purple-400 transition duration-300">
            Button
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
