import Hero from "../components/Hero";
import NewsInsights from "../components/NewsInsights";
import About from "../components/About";
import Contactus from "../components/ContactUs";
import Industries from "../components/Sectorweserve";
import CareersSection from "../components/CareersSection";
import Partners from "../components/Partners";

const Home = () => {
  return (
    <div className="bg-white text-neutral-900 w-full">
      <Hero />
      <About />
      <Industries />
      <NewsInsights />
      <Partners />
      <CareersSection />
      <div id="contactus">
        <Contactus />
      </div>
    </div>
  );
};

export default Home;