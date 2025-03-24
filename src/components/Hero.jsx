import ProfilePic from "../../src/assets/kevinRushProfile.png"
import { delay, motion } from "framer-motion"
import { databases } from "../appwrite";
import { useEffect, useState } from "react";

const container = (delay)=>({
    hidden : {x: -100 , opacity : 0},
    visible: {
        x: 0,
        opacity: 1,
        transition : {
            duration : 0.5,
            delay: delay
        }
    }
})

const Hero = () => {

  const [intro , setIntro] = useState("");

  const init = async () => {
    const intro = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_INTRO
    );
    setIntro(intro.documents[0]);
    console.log(intro.documents[0]);

  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="border-b border-neutral-900
    pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center
          lg:items-start">
            <motion.h1 variants={container(0)}
            initial="hidden"
            animate="visible"
            className="pb-16 text-6xl font-thin
            tracking-tight lg:mt-16">Palash Ghosal</motion.h1>
           <motion.span variants={container(0.5)}
           initial="hidden"
           animate="visible" className="bg-gradient-to-r from-pink-300
           via-slate-500 to-purple-500 bg-clip-text
           text-3xl text-transparent">
             {
              intro.designation
             }
           </motion.span >
           <motion.p variants={container(1)}
           initial="hidden" animate="visible" className="my-2 max-w-xl motion.py-6 font-light
           tracking-tighter">
             {
              intro.introduction
             }
           </motion.p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img initial={{ x: 100, opacity: 0}}
            animate={{ x:0 , opacity: 1 }}
            className="w-full object-cover"
            transition={{ duration: 1 , delay: 1.2 }} src={intro.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero