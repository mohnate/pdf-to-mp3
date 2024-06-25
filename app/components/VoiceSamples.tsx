import { useState, useEffect } from "react";
import { RiVoiceprintFill } from "react-icons/ri";

interface VoiceSample {
  name: string;
  url: string;
}

const voiceSamples: VoiceSample[] = [
  { name: "Alloy", url: "/samples/alloy.mp3" },
  { name: "Echo", url: "/samples/echo.mp3" },
  { name: "Fable", url: "/samples/fable.mp3" },
  { name: "Anyx", url: "/samples/anyx.mp3" },
  { name: "Nova", url: "/samples/nova.mp3" },
  { name: "Shimmer", url: "/samples/shimmer.mp3" },
];

const SampleMp3Voices: React.FC = () => {
  const [currentSample, setCurrentSample] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSample = (url: string) => {
    const audio = new Audio(url);
    setCurrentSample(url);
    setIsPlaying(true);

    audio.play();
    audio.addEventListener("ended", () => {
      setCurrentSample(null);
      setIsPlaying(false);
    });
  };

  return (
    <div className="w-full mb-10">
      <h2 className="lg:text-2xl font-bold mb-4">
        Explore the different voices available for converting your text or PDF
        documents into MP3 files. Click on any voice below to hear a sample.
      </h2>
      <ul className="lg:flex gap-4">
        {voiceSamples.map((sample) => (
          <li key={sample.name} className="flex items-center space-x-4">
            <button
              className={`px-4 py-2 mb-4 rounded-lg text-white flex items-center justify-between gap-4 w-56 ${
                currentSample === sample.url
                  ? "bg-blue-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => playSample(sample.url)}
            >
              <span className="flex items-center">
                {sample.name}
                {currentSample === sample.url && isPlaying && (
                  <span className="ml-2 flex space-x-1">
                    <span className="animate-[dots1_1s_steps(5,start)_infinite]">
                      .
                    </span>
                    <span className="animate-[dots2_1s_steps(5,start)_infinite]">
                      .
                    </span>
                    <span className="animate-[dots3_1s_steps(5,start)_infinite]">
                      .
                    </span>
                  </span>
                )}
              </span>
              <RiVoiceprintFill />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleMp3Voices;
