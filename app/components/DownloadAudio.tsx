import React, { useState, useRef, useEffect } from "react";
import {
  FaDownload,
  FaArrowLeft,
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaFastForward,
  FaFastBackward,
} from "react-icons/fa";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react"; // Import useUser from Clerk

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
  const { isSignedIn, user } = useUser(); // Get the user object from Clerk
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [playbackRate, setPlaybackRate] = useState(1);
  const saveAudioFile = useMutation(api.saveAudioFile.saveAudioFile);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
        setDuration(formatTime(audio.duration));
      };
      audio.addEventListener("timeupdate", updateProgress);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changePlaybackRate = (rate: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const skipTime = (amount: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(
        audio.duration,
        Math.max(0, audio.currentTime + amount)
      );
    }
  };

  const handleSave = async () => {
    if (!isSignedIn) {
      alert("You need to be signed in to save the audio file.");
      return;
    }

    try {
      const response = await fetch(audioUrl);
      const audioData = new Uint8Array(await response.arrayBuffer());
      const userId = user.id;
      const fileName = "audio-file.mp3";
      await saveAudioFile({ userId, fileName, audioData });
      alert("Audio file saved successfully!");
    } catch (error) {
      console.error("Error saving audio file:", error);
      alert("Failed to save audio file.");
    }
  };

  return (
    <div className="h-[600px] w-full relative flex flex-col lg:flex-row bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="lg:w-2/5 p-8 flex flex-col justify-between">
        <h2 className="lg:text-3xl text-xl font-bold text-gray-800">
          🎉 Your Audio is Ready!
        </h2>
        <p className="text-gray-600 text-sm py-4">
          🎉 Your audio file is now ready! With just a few clicks, you’ve
          transformed your text or PDF into a high-quality MP3. Download your
          file to enjoy your content anytime, anywhere. Thank you for using our
          service! Happy listening! 🎧
        </p>
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => skipTime(-10)}
              className="bg-gray-500 text-white p-2 rounded-lg flex items-center justify-center hover:bg-gray-600 transition"
            >
              <FaFastBackward />
            </button>
            <button
              onClick={() => skipTime(-5)}
              className="bg-gray-500 text-white p-2 rounded-lg flex items-center justify-center hover:bg-gray-600 transition"
            >
              <FaBackward />
            </button>
            <button
              onClick={togglePlayPause}
              className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={() => skipTime(5)}
              className="bg-gray-500 text-white p-2 rounded-lg flex items-center justify-center hover:bg-gray-600 transition"
            >
              <FaForward />
            </button>
            <button
              onClick={() => skipTime(10)}
              className="bg-gray-500 text-white p-2 rounded-lg flex items-center justify-center hover:bg-gray-600 transition"
            >
              <FaFastForward />
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span>{currentTime}</span>
            <div className="flex-grow mx-4 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span>{duration}</span>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => changePlaybackRate(0.5)}
              className={`p-2 rounded-lg flex items-center justify-center transition ${playbackRate === 0.5 ? "bg-blue-500 text-white" : "bg-gray-500 text-white hover:bg-gray-600"}`}
            >
              0.5x
            </button>
            <button
              onClick={() => changePlaybackRate(1)}
              className={`p-2 rounded-lg flex items-center justify-center transition ${playbackRate === 1 ? "bg-blue-500 text-white" : "bg-gray-500 text-white hover:bg-gray-600"}`}
            >
              1x
            </button>
            <button
              onClick={() => changePlaybackRate(1.5)}
              className={`p-2 rounded-lg flex items-center justify-center transition ${playbackRate === 1.5 ? "bg-blue-500 text-white" : "bg-gray-500 text-white hover:bg-gray-600"}`}
            >
              1.5x
            </button>
            <button
              onClick={() => changePlaybackRate(2)}
              className={`p-2 rounded-lg flex items-center justify-center transition ${playbackRate === 2 ? "bg-blue-500 text-white" : "bg-gray-500 text-white hover:bg-gray-600"}`}
            >
              2x
            </button>
          </div>
          <audio ref={audioRef} src={audioUrl} className="hidden" />
          <div className="">
            <button
              onClick={handleSave}
              className="w-full my-5 bg-[#f6e067] gap-2 rounded-full text-black px-4 py-2 text-xl font-thin flex items-center justify-center"
            >
              <FaDownload />
              Save Audio
            </button>
            <button
              onClick={onDownload}
              className="w-full my-5 bg-[#f6e067] gap-2 rounded-full text-black px-4 py-2 text-xl font-thin flex items-center justify-center"
            >
              <FaDownload />
              Download Audio
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-600 transition transform"
            >
              <FaArrowLeft />
              Back
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 lg:w-1/2 relative">
        <Image
          src="/bg-download.jpg"
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="lg:rounded-r-3xl absolute"
        />
      </div>
    </div>
  );
};

export default DownloadAudio;
