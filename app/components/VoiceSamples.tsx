import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef } from "react";
import { RiVoiceprintFill } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

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
  const textRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const textDescription =
    "Explore the different voices available for converting your text or PDF documents into MP3 files. Click on any voice below to hear a sample.";

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

  useGSAP(() => {
    const words = textRef.current?.querySelectorAll("span");

    if (words) {
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top bottom",
          },
        }
      );
    }

    gsap.fromTo(
      btnRefs.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
        },
      }
    );
  });

  return (
    <div className="lg:m-[100px] mx-10 mt-0 pt-0">
      <h2 ref={textRef} className="lg:text-2xl font-bold mb-10  text-white ">
        {textDescription.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-2">
            {word}
          </span>
        ))}
      </h2>
      <ul className="lg:flex gap-4">
        {voiceSamples.map((sample, index) => (
          <li key={sample.name} className="flex items-center space-x-4">
            <button
              ref={(el) => (btnRefs.current[index] = el)}
              className={`flex justify-between items-center mb-4 h-12 lg:w-[205px] rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full ${
                currentSample === sample.url ? "" : ""
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
