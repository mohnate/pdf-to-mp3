import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-200 lg:px-40 lg:py-4 p-4 text-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="">
          <Link href="/" passHref>
            <span className="flex items-center gap-4 cursor-pointer">
              <Image
                src="/favicon.ico"
                alt="Home"
                width={60}
                height={60}
                className="rounded-xl"
              />
              <span className="text-base font-semibold text-gray-700">
                Text to MP3 Converter
              </span>
            </span>
          </Link>
        </div>

        <div>
          <h6 className="font-semibold text-sm">Copyright © 2024</h6>
          <h1 className="font-semibold text-xs">assemghor.reda@gmail.com</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
