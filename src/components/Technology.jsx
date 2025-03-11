import { motion } from "framer-motion"

const iconVariants = (duration) => ({
   initial : {
      y: -10
   },
   animate : {
      y : [10,-10],
      transition : {
         duration : duration,
         ease : "linear",
         repeat : Infinity,
         repeatType : "reverse"
      }
   }
})

function Technology(){
    return(
        <div className="border-b border-neutral-800
        pb-24">
          <motion.h1
          whileInView={{ opacity: 1, y:0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 1.5 }}
          className="my-20 text-4xl text-center">
             Technologies
          </motion.h1>
          <motion.div
         whileInView={{ opacity: 1, x:0 }}
         initial={{ opacity: 0, x: -100 }}
         transition={{ duration: 1.5 }}
          className="flex flex-wrap items-center justify-center gap-4">
           <motion.div
             variants={iconVariants(2.5)}
             initial="initial"
             animate="animate"
           className="rounded-2xl border-4 border-cyan-800 p-4">
              Object Detection
           </motion.div>
           <motion.div
             variants={iconVariants(3)}
             initial="initial"
             animate="animate"
           className="rounded-2xl border-4 border-green-400 p-4">
              Image Segmentation
           </motion.div>
           <motion.div
             variants={iconVariants(2)}
             initial="initial"
             animate="animate"
           className="rounded-2xl border-4 border-red-400 p-4">
              Transformers
           </motion.div>
           <motion.div
            variants={iconVariants(2.5)}
            initial="initial"
            animate="animate"
           className="rounded-2xl border-4 border-cyan-800 p-4">
              Computer Vision
           </motion.div>
           <motion.div
             variants={iconVariants(2.5)}
             initial="initial"
             animate="animate"
           className="rounded-2xl border-4 border-cyan-800 p-4">
              Object Detection
           </motion.div>
           <motion.div
             variants={iconVariants(6)}
             initial="initial"
             animate="animate"
           className="rounded-2xl border-4 border-cyan-800 p-4">
              Object Detection
           </motion.div>
          </motion.div>
        </div>
    )
}
export default Technology