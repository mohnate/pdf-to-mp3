"use client";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

const Dropdown = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-stone-900 text-white z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-10 right-8 text-3xl"
        onClick={toggleMenu}
        aria-label="Close Menu"
      >
        <FaTimes />
      </button>
      <div className="flex flex-col gap-4 items-center justify-center h-full space-y-8">
        <Link href="/" passHref>
          <div
            className="text-2xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-purple-500"
            onClick={toggleMenu}
          >
            Home
          </div>
        </Link>
        <Link href="/about" passHref>
          <div
            className="text-2xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-purple-500"
            onClick={toggleMenu}
          >
            About
          </div>
        </Link>
        <Link href="/features" passHref>
          <div
            className="text-2xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-purple-500"
            onClick={toggleMenu}
          >
            Features
          </div>
        </Link>
        <Link href="/contact" passHref>
          <div
            className="text-2xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-purple-500"
            onClick={toggleMenu}
          >
            Contact
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
