import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import service from "../db";
function Education(){

 const [education , setEducation] = useState([]);

 const init = async () => {
    const education = await service.databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID_EDUCATION
    );
    setEducation(education.documents);
 };

 useEffect(() => {
    init();
 }, []);

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
                            {item.institution}
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