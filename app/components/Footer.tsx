import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-200 p-10 text-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="max-w-[500px] mb-8 md:mb-0">
          <Link href="/" passHref>
            <span className="flex items-center gap-4 mb-4 cursor-pointer">
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
          <p className="mb-4 text-sm">
            Convert your text and PDF documents into MP3 audio files easily.
            Choose from a variety of AI voices to suit your needs and enjoy
            listening to your documents on the go.
          </p>
          <h6 className="font-semibold text-sm">
            Copyright © 2024 - All rights reserved
          </h6>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <h2 className="text-base font-semibold mb-4">LINKS</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="mailto:support@texttomp3converter.com" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Support
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Blog
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/voices" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    AI Voices
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-4">LEGAL</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms-of-service" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-4">MORE</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <span className="hover:text-blue-500 transition duration-300 cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
