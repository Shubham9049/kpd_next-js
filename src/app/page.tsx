import About from "../../components/About";
import FeaturedProjects from "../../components/FeaturedProjects";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import LatestLaunches from "../../components/LatestLaunches";
import Nav from "../../components/Nav";
import Testimonials from "../../components/Testimonial";

export default function Home() {
  return (
    <div>
      <Nav />
      <Hero />

      <About />
      <LatestLaunches />
      <Testimonials />
      <FeaturedProjects />
      <Footer />
    </div>
  );
}
