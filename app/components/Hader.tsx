"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";

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
          start: "top top",
          end: "+=200",
        },
      }
    );
  });

  return (
    <header ref={headerRef} className="bg-white shadow-md p-4">
      <div className="container relative mx-auto flex justify-between items-center px-4">
        <div className="flex items-center cursor-pointer hover:text-purple-500 transition duration-300">
          <Image src="/favicon.ico" alt="logo" width={32} height={32} />
          <h1 className="text-xl md:text-2xl font-bold ml-2">
            PDF to MP3 Generator
          </h1>
        </div>
        <div className="flex space-x-4 items-center">
          <button className="mr-3 font-bold hover:text-purple-500 transition duration-300 hidden sm:block">
            Support
          </button>
          <Unauthenticated>
            <div className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300">
              <SignInButton mode="modal" />
            </div>
          </Unauthenticated>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </div>
    </header>
  );
};

export default Header;
