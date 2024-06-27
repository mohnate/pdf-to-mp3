import Image from "next/image";
import { WobbleCard } from "./ui/wobble-card";

const Info = () => {
  return (
    <div className="mb-0 pb-0 mx-10">
      <h1 className="text-gray-500 text-2xl py-4 text-center md:text-left">
        AI-Powered Text and PDF to MP3 Conversion
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[300px]"
          className="relative flex flex-col justify-between p-4"
        >
          <div className="max-w-xs">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11.414l-3-3V5a1 1 0 112 0v4.586l2.293 2.293a1 1 0 01-1.414 1.414z" />
              </svg>
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Choose from 6 AI Voices
              </h2>
            </div>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Select from six different AI voices provided by OpenAI to convert
              your text or PDF to MP3 with lifelike quality.
            </p>
          </div>
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 min-h-[300px] bg-gray-800"
          className="relative p-4"
        >
          <div className="max-w-xs">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm12-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
              </svg>
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Download MP3 File
              </h2>
            </div>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Easily download the converted MP3 files for offline use and enjoy
              high-quality audio anytime, anywhere.
            </p>
          </div>
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 min-h-[300px] bg-gray-800"
          className="relative p-4"
        >
          <div className="max-w-xs">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a1 1 0 000 2h12a1 1 0 100-2H4zM3 7a1 1 0 000 2h12a1 1 0 100-2H3zM4 11a1 1 0 000 2h7a1 1 0 100-2H4z" />
              </svg>
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                PDF Files to Speech
              </h2>
            </div>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Upload PDF files and convert them to speech, making your documents
              accessible and easy to listen to on the go.
            </p>
          </div>
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 bg-blue-900 min-h-[300px]"
          className="relative p-4"
        >
          <div className="max-w-xs">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 00-1 1v2a1 1 0 102 0V3a1 1 0 00-1-1zM5.293 6.293A1 1 0 106.707 7.707L5.414 9H11V3.414L9.707 2.707a1 1 0 00-1.414 0l-3 3zM14 10a1 1 0 000 2h2v5H4v-5h2a1 1 0 100-2H3a1 1 0 00-1 1v7a1 1 0 001 1h14a1 1 0 001-1v-7a1 1 0 00-1-1h-3z" />
              </svg>
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Text to Speech Using AI
              </h2>
            </div>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Convert any text input to speech using advanced AI technology,
              enhancing accessibility and convenience.
            </p>
          </div>
        </WobbleCard>
      </div>
    </div>
  );
};

export default Info;
