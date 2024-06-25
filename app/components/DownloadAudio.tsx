import React from "react";

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
    <div className="flex flex-col items-center w-full rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Audio is Ready!</h2>
      <audio controls className="w-full mb-4">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={onDownload}
        className="w-full bg-blue-500 text-white p-2 rounded mb-4"
      >
        Download Audio
      </button>
      <button
        onClick={onBack}
        className="w-full bg-gray-500 text-white p-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default DownloadAudio;
