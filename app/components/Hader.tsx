"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnnouncementBar from "./AnnouncementBar";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import Dropdown from "./Dropdown";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      <AnnouncementBar />
      <header ref={headerRef} className="bg-stone-200 px-8 py-4 relative z-40">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center cursor-pointer hover:text-purple-500 transition duration-300">
            <Image src="/favicon.ico" alt="logo" width={32} height={32} />
            <h1 className="text-xl md:text-2xl font-bold ml-2">
              PDF to MP3 Generator
            </h1>
          </div>
          <nav className="hidden md:flex space-x-4 items-center">
            <Link href="/" passHref>
              <div className="font-bold transition-transform duration-300 hover:scale-110 hover:text-purple-500 cursor-pointer">
                Home
              </div>
            </Link>
            <Link href="/about" passHref>
              <div className="font-bold transition-transform duration-300 hover:scale-110 hover:text-purple-500 cursor-pointer">
                About
              </div>
            </Link>
            <Link href="/features" passHref>
              <div className="font-bold transition-transform duration-300 hover:scale-110 hover:text-purple-500 cursor-pointer">
                Features
              </div>
            </Link>
            <Link href="/contact" passHref>
              <div className="font-bold transition-transform duration-300 hover:scale-110 hover:text-purple-500 cursor-pointer">
                Contact
              </div>
            </Link>
          </nav>
          <button
            className="block md:hidden text-xl text-gray-700 z-50"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <FaBars />
          </button>
        </div>
      </header>
      <Dropdown isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Header;
