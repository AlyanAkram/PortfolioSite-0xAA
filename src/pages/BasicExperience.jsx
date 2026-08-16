import Navbar from "../components/basic/Navbar";
import Hero from "../components/basic/Hero";
import StatusTicker from "../components/basic/StatusTicker";
import About from "../components/basic/About";
import Projects from "../components/basic/Projects";
import Skills from "../components/basic/Skills";
import Contact from "../components/basic/Contact";
import Footer from "../components/basic/Footer";
import { INK } from "../components/basic/tokens";

export default function BasicExperience({ onExit }) {
  return (
    <div className="min-h-screen" style={{ background: INK.bg }}>
      <Navbar onExit={onExit} />
      <Hero />
      <StatusTicker />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer onExit={onExit} />
    </div>
  );
}
