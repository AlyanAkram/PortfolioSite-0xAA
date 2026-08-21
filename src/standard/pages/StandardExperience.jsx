import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatusTicker from "../components/StatusTicker";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { INK } from "../components/tokens";

export default function StandardExperience() {
  const navigate = useNavigate();
  const onExit = () => navigate("/");
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
