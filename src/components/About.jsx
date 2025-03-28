import { useEffect, useState } from "react";
import AboutPic from "../../src/assets/about.jpg"
import { motion } from "framer-motion"
import service from "../db";
function About(){

  const [about , setAbout] = useState("");

  const init = async () => {
    const about = await service.getAbout();
    if(about?.documents?.length > 0){
      const aboutData = about.documents[0]; // Taking the first document
      aboutData.image = await service.getFileURL(aboutData.image); // Fetch the file preview URL from Appwrite Storage
      setAbout(aboutData);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <>
   {
    about ?
    <div className="border-b border-neutral-900 pb-4">
          <h1 className="my-20 text-center text-4xl">
            About <span className="text-neutral-500">
            Me
            </span>
          </h1>
          <div className="flex flex-wrap">
            <motion.div
            whileInView={{ opacity: 1, x:0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
             className="w-full lg:w-1/2 lg:p-8">
             <div className="flex items-center justify-center">
               <img className="rounded-2xl w-full h-[400px] object-cover" src={about.image} alt="" />
             </div>

            </motion.div>
            <motion.div
            whileInView={{ opacity: 1, x:0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="w-full py-5 px-5 lg:px-0 lg:w-1/2 ">
               <div className="flex justify-center my-2  max-w-x; lg:justify-start my-2 max-w-xl motion.py-6 font-light
           tracking-tighter">
                 {
                  about.description
                 }
               </div>
             </motion.div>
          </div>
        </div>
        :
        <div className="h-[100vh">

        </div>
   }
  </>
}
export default About