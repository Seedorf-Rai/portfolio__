import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import service from "../db";
 // Adjust import as needed

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const colors = ["border-cyan-800", "border-green-400", "border-red-400", "border-yellow-400", "border-blue-400"];

function Technology() {
  const [technologies, setTechnologies] = useState([]);

  const init = async () => {
    try {
      const response = await service.databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID_TECHNOLOGY
      );
      console.log(response.documents);

      setTechnologies(response.documents); // Assuming API returns an array of technology names
    } catch (error) {
      console.error("Error fetching technologies:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <>
   {
    technologies.length > 0 ?  <div className="border-b border-neutral-800 pb-24">
    <motion.h1
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.5 }}
      className="my-20 text-4xl text-center"
    >
      Technologies
    </motion.h1>
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.5 }}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.$id} // Ensure unique key
          variants={iconVariants(2 + Math.random() * 4)} // Random duration between 2-6
          initial="initial"
          animate="animate"
          className={`rounded-2xl border-4 ${colors[index % colors.length]} p-4`}
        >
          {tech.name} {/* Assuming the document has a 'name' field */}
        </motion.div>
      ))}
    </motion.div>
  </div>
  : ''
   }
  </>
}

export default Technology;
