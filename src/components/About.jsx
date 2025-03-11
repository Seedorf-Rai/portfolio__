import AboutPic from "../../src/assets/about.jpg"
import { motion } from "framer-motion"
function About(){
    return(
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
               <img className="rounded-2xl" src={AboutPic} alt="" />
             </div>

            </motion.div>
            <motion.div
            whileInView={{ opacity: 1, x:0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="w-full py-5 px-5 lg:px-0 lg:w-1/2 ">
               <div className="flex justify-center my-2 max-w-x; lg:justify-start">
                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde eveniet corporis provident quae commodi voluptatibus incidunt quasi similique quod doloribus ipsam dolores quibusdam facere esse facilis ab, tenetur aut quis maxime sequi ea. Illum tempore architecto eos debitis officia ipsum distinctio. Incidunt delectus corrupti placeat distinctio doloremque cumque asperiores atque adipisci pariatur quaerat, exercitationem soluta! Pariatur sequi reprehenderit nisi sit dolorum tempora possimus nemo itaque. Neque quod magni dolorum sequi, excepturi nesciunt doloremque repellat optio saepe. Sunt expedita mollitia, ipsam culpa aperiam reiciendis quasi cumque, alias soluta corporis quibusdam autem eius voluptatum, in dolore odit eum odio enim officiis! Commodi!
               </div>
             </motion.div>
          </div>
        </div>
    )
}
export default About