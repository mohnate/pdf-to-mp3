"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlay } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface VoiceSample {
  name: string;
  url: string;
  gender: string;
  nationality: string;
  description: string;
}

const voiceSamples: VoiceSample[] = [
  {
    name: "Alloy",
    url: "/samples/alloy.mp3",
    gender: "Gender-neutral",
    nationality: "Global",
    description:
      "Alloy's voice can be perceived as either masculine or feminine, making it a versatile option suitable for a wide range of applications.",
  },
  {
    name: "Echo",
    url: "/samples/echo.mp3",
    gender: "Masculine",
    nationality: "American",
    description:
      "Echo has a strong and clear voice, ideal for authoritative or formal contexts.",
  },
  {
    name: "Fable",
    url: "/samples/fable.mp3",
    gender: "Masculine",
    nationality: "British",
    description:
      "Fable's voice is warm and engaging, making it perfect for storytelling and educational content.",
  },
  {
    name: "Onyx",
    url: "/samples/onyx.mp3",
    gender: "Masculine",
    nationality: "Australian",
    description:
      "Onyx features a deep and resonant voice, suited for serious and impactful messages.",
  },
  {
    name: "Nova",
    url: "/samples/nova.mp3",
    gender: "Feminine",
    nationality: "Canadian",
    description:
      "Nova has a soft and soothing voice, ideal for customer service and friendly interactions.",
  },
  {
    name: "Shimmer",
    url: "/samples/shimmer.mp3",
    gender: "Feminine",
    nationality: "American",
    description:
      "Shimmer's voice is bright and energetic, great for lively and enthusiastic communication.",
  },
];

const SampleMp3Voices: React.FC = () => {
  const [currentSample, setCurrentSample] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  const textDescription =
    "Explore the different voices available for converting your text or PDF documents into MP3 files. Click on any voice below to hear a sample.";

  const playSample = (url: string, name: string) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const newAudio = new Audio(url);
    setCurrentSample(url);
    setIsPlaying(true);
    setAudio(newAudio);
    setCurrentPlaying(name);

    newAudio.play();
    newAudio.addEventListener("ended", () => {
      setCurrentSample(null);
      setIsPlaying(false);
      setAudio(null);
      setCurrentPlaying(null);
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

    const cards = cardRef.current?.querySelectorAll("li");

    if (cards) {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            delay: index * 0.3,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    }

    const buttons = buttonRefs.current;

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.2, duration: 0.3 });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      });
    });
  });

  useEffect(() => {
    const cards = cardRef.current?.querySelectorAll("li");

    if (cards) {
      cards.forEach((card) => {
        if (card.classList.contains("playing")) {
          gsap.to(card, {
            rotate: 2,
            yoyo: true,
            repeat: 9,
            duration: 0.1,
            ease: "power1.inOut",
          });
        } else {
          gsap.to(card, {
            duration: 0.5,
            ease: "power1.inOut",
          });
        }
      });
    }
  }, [currentPlaying]);

  return (
    <div className="lg:m-[100px] m-10">
      <h2 ref={textRef} className="lg:text-2xl font-bold mb-10 text-gray-500">
        {textDescription.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-2">
            {word}
          </span>
        ))}
      </h2>
      <ul ref={cardRef} className="grid lg:grid-cols-3 gap-4">
        {voiceSamples.map((sample, index) => (
          <li
            key={sample.name}
            className={`flex flex-col li bg-[#eaeaea] rounded-full shadow-2xl p-4 ${currentPlaying === sample.name ? "playing" : ""}`}
          >
            <div className="flex items-center gap-4">
              <button
                ref={(el) => {
                  if (el) buttonRefs.current[index] = el;
                }}
                className="playBtn bg-[#3fcfa4] rounded-full p-4"
                onClick={() => playSample(sample.url, sample.name)}
              >
                <FaPlay size={20} />
              </button>
              <div className="text-gray-500">
                <h3 className="font-semibold">{sample.name}</h3>
                <p className="text-xs py-2">
                  <span className="bg-[#f4d1d1] rounded-full py-1 px-2 mr-2">
                    {sample.gender}
                  </span>

                  <span className="bg-[#fff2cc] rounded-full px-2 p-1">
                    {sample.nationality}
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleMp3Voices;
