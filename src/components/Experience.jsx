import { motion } from "framer-motion";
function Education(){
 const education = [
    {
        id: 1,
        year: '2015-2016',
        degree: 'Bachelor of Science in Computer Science',
        university: 'University of California, Berkeley',
        description : 'Course of Computer Science  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque pariatur eum repudiandae officiis? Temporibus quibusdam libero rerum natus earum obcaecati porro aspernatur quia, expedita laboriosam tempora sunt totam quo et, ab nostrum necessitatibus nam laudantium doloribus. Non, commodi vel. Ut dolores ipsa enim dignissimos nisi fuga quam, placeat fugit commodi.'
    },
    {
        id: 1,
        year: '2015-2016',
        degree: 'Bachelor of Science in Computer Science',
        university: 'University of California, Berkeley',
        description : 'Course of Computer Science  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque pariatur eum repudiandae officiis? Temporibus quibusdam libero rerum natus earum obcaecati porro aspernatur quia, expedita laboriosam tempora sunt totam quo et, ab nostrum necessitatibus nam laudantium doloribus. Non, commodi vel. Ut dolores ipsa enim dignissimos nisi fuga quam, placeat fugit commodi.'
    },
    {
        id: 1,
        year: '2015-2016',
        degree: 'Bachelor of Science in Computer Science',
        university: 'University of California, Berkeley',
        description : 'Course of Computer Science  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque pariatur eum repudiandae officiis? Temporibus quibusdam libero rerum natus earum obcaecati porro aspernatur quia, expedita laboriosam tempora sunt totam quo et, ab nostrum necessitatibus nam laudantium doloribus. Non, commodi vel. Ut dolores ipsa enim dignissimos nisi fuga quam, placeat fugit commodi.'
    }
 ];

    return(
        <div className="border-b border-neutral-900
        pb-4">
         <motion.h1
         whileInView={{ opacity: 1, y:0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
         className="my-20 text-center text-4xl">
            Education
         </motion.h1>
         <div>
            {
                education.map((item, index) => {
                    return <div key={index} className="mb-8
                    flex flex-wrap lg:justify-center" >
                     <motion.div
                     whileInView={{ opacity: 1, x:0 }}
                        initial={{ opacity: 0, x: -100 }}
                        transition={{ duration: 1 }}
                     className="w-full lg:w-1/4">
                       <p className="mb-2 text-sm
                       text-neutral-400" >
                        {
                            item.year
                        }
                       </p>
                     </motion.div>
                     <motion.div
                     whileInView={{ opacity: 1, x:0 }}
                        initial={{ opacity: 0, x: 100 }}
                        transition={{ duration: 1 }}
                     className="w-full max-w-xl
                     lg:w-3/4 ">
                       <h6 className="mb-2 font-semibold" >
                         {item.degree} - {" "}
                         <span className="text-sm text-purple-100">
                            {item.university}
                         </span>
                       </h6>
                       <p className="mb-4 text-neutral-400">
                        {
                            item.description
                        }
                       </p>
                     </motion.div>
                    </div>
            })
        }
         </div>
        </div>
    )
}
export default Education