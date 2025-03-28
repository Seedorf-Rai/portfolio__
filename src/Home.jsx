import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technology from "./components/Technology";
import Education from "./components/Experience";
import Project from "./components/Project";
import Contact from "./components/Contact";
import RandD from "./components/RandD";
import { motion } from "framer-motion";

const quotes = [
  "Patience is not simply the ability to wait – it’s how we behave while we’re waiting. – Joyce Meyer",
  "The two most powerful warriors are patience and time. – Leo Tolstoy",
  "Good things come to those who wait, but better things come to those who work for it.",
  "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
  "Act as if what you do makes a difference. It does. – William James",
  "Difficulties increase the nearer we get to the goal. – Johann Wolfgang von Goethe",
  "With the new day comes new strength and new thoughts. – Eleanor Roosevelt",
  "Start where you are. Use what you have. Do what you can. – Arthur Ashe"
];

function Home() {
  const [count, setCount] = useState(0);
  const [loading,setLoading] = useState(true);
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  setTimeout(()=>{
    setLoading(false)
  },[5000])
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw] absolute bg-neutral-950 text-white">
        <motion.div
          className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
          <div className="hidden">
          {/* <Hero setLoading={setLoading} ></Hero> */}
          <Navbar></Navbar>
            {/* <Hero setLoading={setLoading} ></Hero> */}
            <Hero></Hero>
            <About></About>
            <Technology></Technology>
            <Education></Education>
            <RandD></RandD>
            <Project></Project>
            <Contact></Contact>
          </div>
        <p className="mt-6 px-4 text-center text-lg italic text-gray-300 max-w-md">
          "{randomQuote}"
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300
  selection:text-cyan-900  "
      >
        <div className="fixed top-0 -z-10 h-full w-full"></div>
        <div className="absolute  top-0 z-[-2]  w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <div className="container mx-auto px-8 lg:px-[10%]">
            <Navbar></Navbar>
            <Hero setLoading={setLoading} ></Hero>
            <About></About>
            <Technology></Technology>
            <Education></Education>
            <RandD></RandD>
            <Project></Project>
            <Contact></Contact>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
