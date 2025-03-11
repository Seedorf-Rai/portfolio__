import ProfilePic from "../../src/assets/kevinRushProfile.png"
import { delay, motion } from "framer-motion"

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
             Associate Professor
           </motion.span >
           <motion.p variants={container(1)}
           initial="hidden" animate="visible" className="my-2 max-w-xl motion.py-6 font-light
           tracking-tighter">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime maiores ut velit non quasi et fugit dolore. Quis, recusandae eligendi. Voluptatibus sequi hic quia veniam molestias, dolorem quasi. Facere temporibus odit dolorum cupiditate quo, porro accusamus soluta numquam doloremque pariatur ex, excepturi, rerum assumenda sequi vel maxime sint quia dolor itaque. Molestias repudiandae distinctio ducimus nostrum accusamus hic totam provident facere corporis quibusdam nisi modi, magnam quo odio ut nesciunt dolor ad enim possimus id sed! Sint eveniet veniam velit nemo perferendis, ducimus corrupti, totam, ad quisquam at aliquam. Ducimus qui iure nihil ipsum aspernatur minima optio temporibus expedita debitis!
           </motion.p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img initial={{ x: 100, opacity: 0}}
            animate={{ x:0 , opacity: 1 }}
            transition={{ duration: 1 , delay: 1.2 }} src={ProfilePic} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero