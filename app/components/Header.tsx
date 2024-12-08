"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="">
      <header className="bg-stone-200 py-4 relative z-40 flex justify-between lg:px-40 px-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center cursor-pointer">
            <Image src="/favicon.ico" alt="logo" width={32} height={32} />
            <h1 className="md:block hidden text-xl md:text-2xl font-bold ml-2">
              PDF to MP3 Generator
            </h1>
          </div>
        </div>
        <ul className="flex items-center gap-5">
          <li className="text-lg font-semibold hover:text-[--green] duration-500 hover:scale-105">
            <Link href={"#generate-audio"}>Generate Audio</Link>
          </li>
          <li>
            <div className="flex space-x-4 items-center">
              <Unauthenticated>
                <div className="bg-[--green] text-white py-2 px-4 rounded-md hover:bg-[#0e4937] transition duration-300">
                  <SignInButton mode="modal" />
                </div>
              </Unauthenticated>
              <Authenticated>
                <UserButton />
              </Authenticated>
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
