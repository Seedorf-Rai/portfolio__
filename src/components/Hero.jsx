import ProfilePic from "../../src/assets/kevinRushProfile.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import service from "../db";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: delay,
    },
  },
});

const Hero = ({ setLoading }) => {
  const [intro, setIntro] = useState(null);
  const [user,setUser] = useState(null)
  const [imageURL, setImageURL] = useState(null); // State to store image URL

  useEffect(() => {
    const init = async () => {
      try {
        const response = await service.getIntro();

        const response2 = await service.getSetting();
        if (response2?.documents?.length > 0) {
          setUser(response2.documents[0]); // Take the first document
        }

        if (response?.documents?.length > 0) {
          const fetchedIntro = response.documents[0];
          console.log("FetchedIntro",fetchedIntro);

          // Fetch   the image URL if an image is present
          if (fetchedIntro.image) {
            const fileUrl = await service.getFileURL(fetchedIntro.image);
            console.log("FIle URL",fileUrl);

            setImageURL(fileUrl);
          }

          console.log(imageURL);


          setIntro(fetchedIntro);
        }
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []); // Removed setLoading from dependencies

  return <>
  {
    intro && user ? (
      <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-16 text-6xl font-thin tracking-tight lg:mt-16"
            >
              {user.name}
            </motion.h1>
            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl text-transparent"
            >
              {user?.designation}
            </motion.span>
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl motion.py-6 font-light tracking-tighter"
            >
              {intro?.description}
            </motion.p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="w-full h-[500px] object-cover"
              src={imageURL} // Use imageURL if available, fallback to ProfilePic
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
    )
    :
    ''
  }
  </>
};

export default Hero;
