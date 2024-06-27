import React from "react";
import { FaDownload, FaArrowLeft } from "react-icons/fa";

interface DownloadAudioProps {
  audioUrl: string;
  onBack: () => void;
  onDownload: () => void;
}

const DownloadAudio: React.FC<DownloadAudioProps> = ({
  audioUrl,
  onBack,
  onDownload,
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-[500px] w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🎉 Your Audio is Ready!
      </h2>
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col gap-6">
        <audio controls className="w-full rounded-lg shadow-md">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button
          onClick={onDownload}
          className="w-full bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
        >
          <FaDownload />
          Download Audio
        </button>
        <button
          onClick={onBack}
          className="w-full bg-gray-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600 transition"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>
    </div>
  );
};

export default DownloadAudio;
