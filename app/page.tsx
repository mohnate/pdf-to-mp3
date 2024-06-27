"use client";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import GenerateSpeechUi from "./components/GenerateSpeechUi";
import Header from "./components/Hader";
import { Hero } from "./components/Hero";
import Info from "./components/Info";
import SampleMp3Voices from "./components/VoiceSamples";

const Home = () => {
  return (
    <div className=" max-w-full h-screen overflow-auto">
      <Header />
      <Hero />
      <Info />
      <SampleMp3Voices />
      <GenerateSpeechUi />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
