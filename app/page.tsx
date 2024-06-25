"use client";
import Footer from "./components/Footer";
import GenerateSpeechUi from "./components/GenerateSpeechUi";
import Header from "./components/Hader";
import { Hero } from "./components/Hero";
import SampleMp3Voices from "./components/VoiceSamples";

const Home = () => {
  return (
    <div className="bg-black overflow-hidden max-w-full min-h-screen">
      <Header />
      <Hero />
      <SampleMp3Voices />
      <GenerateSpeechUi />
      <Footer />
    </div>
  );
};

export default Home;
