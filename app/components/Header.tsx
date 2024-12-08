"use client";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="">
      <header className="bg-stone-200 py-4 relative z-40 flex justify-between px-[150px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center cursor-pointer hover:text-[--green] transition duration-300">
            <Image src="/favicon.ico" alt="logo" width={32} height={32} />
            <h1 className="md:block hidden text-xl md:text-2xl font-bold ml-2">
              PDF to MP3 Generator
            </h1>
          </div>
        </div>
        <ul className="flex justify-between gap-8 font-bold text-lg">
          <li className="hover:text-[--green] duration-500 hover:scale-105">
            <Link href={"#contact"}>Contact</Link>
          </li>
          <li className="hover:text-[--green] duration-500 hover:scale-105">
            <Link href={"#generate-audio"}>Generate Audio</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
