import GenerateSpeechUi from "./components/GenerateSpeechUi";
import { Hero } from "./components/Hero";

const Home = () => {
  return (
    <div className="bg-black text-white overflow-hidden max-w-full">
      <Hero />
      <GenerateSpeechUi />
    </div>
  );
};

export default Home;
