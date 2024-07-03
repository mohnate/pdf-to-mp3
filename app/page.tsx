"use client";
import { useRef } from "react";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import GenerateSpeechUi from "./components/GenerateSpeechUi";
import Header from "./components/Header";
import { Hero } from "./components/Hero";
import Info from "./components/Info";
import SampleMp3Voices from "./components/VoiceSamples";

const Home = () => {
  const generateSpeechRef = useRef(null);

  return (
    <div className="relative bg-pattern">
      {/* <Header /> */}
      <Hero generateSpeechRef={generateSpeechRef} />
      <Info />
      <SampleMp3Voices />
      <div ref={generateSpeechRef}>
        <GenerateSpeechUi />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
