import Image from "next/image";
import { WobbleCard } from "./ui/wobble-card";
import { RiUserVoiceFill } from "react-icons/ri";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";

const Info = () => {
  return (
    <div className="relative">
      <h1 className="text-gray-500 text-4xl font-black opacity-60 p-4">
        AI-Powered Text and PDF to MP3 Conversion
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto lg:px-40 px-4">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2  bg-pink-800 min-h-[300px] "
          className="relative flex flex-col"
        >
          <div className="max-w-xs md:min-w-full">
            <div className="flex items-center space-x-4">
              <RiUserVoiceFill size={80} color="white" />
              <h2 className="text-left w-full text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
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
          <div className="max-w-xs md:min-w-full">
            <div className="flex items-center space-x-2">
              <FaDownload size={80} color="white" />
              <h2 className="text-left text-balance text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
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
          <div className="max-w-xs md:min-w-full">
            <div className="flex items-center space-x-2">
              <FaFilePdf size={80} color="white" />
              <h2 className="text-left text-balance text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
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
          <div className="max-w-xs md:min-w-full">
            <div className="flex items-center space-x-2">
              <IoLanguageSharp size={80} color="white" />

              <h2 className="text-left text-balance text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                In Any Language!
              </h2>
            </div>
            <p className="mt-4 text-left text-neutral-200">
              Effortlessly Translate and Convert Text or PDF to Speech in Any
              Language Seamlessly transform your text or PDF documents into
              spoken words in your preferred language.
            </p>
          </div>
        </WobbleCard>
      </div>
    </div>
  );
};

export default Info;
