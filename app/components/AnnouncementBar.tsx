"use client";
import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const AnnouncementBar = () => {
  return (
    <div className="bg-gray-800 text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <button className="font-bold hover:text-[#3fcfa4] transition duration-300">
          Support
        </button>
        <div className="flex space-x-4 items-center">
          <Unauthenticated>
            <div className="bg-[#3fcfa4] text-white py-2 px-4 rounded-md hover:bg-[#0e4937] transition duration-300">
              <SignInButton mode="modal" />
            </div>
          </Unauthenticated>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
