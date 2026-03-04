import { Header } from "@/components/lex/Header";
import { Hero } from "@/components/lex/Hero";
import { AboutStudio } from "@/components/lex/AboutStudio";
import { Services } from "@/components/lex/Services";
import { Team } from "@/components/lex/Team";
import { Achievements } from "@/components/lex/Achievements";
import { News } from "@/components/lex/News";
import { Contact } from "@/components/lex/Contact";
import { Footer } from "@/components/lex/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main>
        <Hero />
        <AboutStudio />
        <Services />
        <Team />
        <Achievements />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}