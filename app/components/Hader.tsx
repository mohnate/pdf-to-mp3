import React from "react";

const Header = () => {
  return (
    <header className="bg-black text-white border-b-[5px] border-white rounded-full py-4 mb-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <h1 className="md:text-2xl font-bold cursor-pointer hover:text-purple-400 transition duration-300">
            PDF to MP3 Generator
          </h1>
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
