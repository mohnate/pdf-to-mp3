import Footer from "./components/Footer";
import GenerateSpeechUi from "./components/GenerateSpeechUi";
import Header from "./components/Hader";
import { Hero } from "./components/Hero";

const Home = () => {
  return (
    <div className="bg-black text-white overflow-hidden max-w-full">
      <Header />
      <Hero />
      <GenerateSpeechUi />
      <Footer />
    </div>
  );
};

export default Home;
