import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import service from "../db";

export default function RandD() {
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState([]);
  // const projects = [
  //   { id: 1, title: "Image Segmentation Project", image: 'https://images.pexels.com/photos/132477/pexels-photo-132477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', technologies: ["Python", "TensorFlow", "Keras", "OpenCV"], description: 'Course of Computer Science Lorem ipsum dolor sit amet consectetur.' },
  //   { id: 2, title: "NLP Chatbot", image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', technologies: ["Python", "NLTK", "TensorFlow", "Flask"], description: 'Natural Language Processing chatbot using neural networks.' },
  //   { id: 3, title: "E-commerce Website", image: 'https://images.pexels.com/photos/5935792/pexels-photo-5935792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', technologies: ["React", "Node.js", "MongoDB", "TailwindCSS"], description: 'Full stack e-commerce platform with admin panel.' },
  //   { id: 4, title: "Portfolio Website", image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', technologies: ["React", "Framer Motion", "TailwindCSS"], description: 'Interactive portfolio showcasing projects and animations.' },
  //   { id: 5, title: "Weather App", image: 'https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', technologies: ["React", "API", "TailwindCSS"], description: 'Real-time weather app fetching data from open APIs.' }
  // ];
  const [visibleProjects, setVisibleProjects] = useState([]);
  const init = async () => {
    const response = await service.getRandD();
            if (response) {
                // Convert file IDs into URLs
                const projectsWithImages = await Promise.all(
                    response.documents.map(async (project) => {
                        if (project.image) {
                            project.image = await service.getFileURL(project.image);
                        }
                        return project;
                    })
                );

                setProjects(projectsWithImages);
              }

  };


  useEffect(() => {
    init();
    console.log(projects);

  }, []);
  useEffect(() => {
    if (projects.length > 0) { // Ensure projects are loaded before setting visibleProjects
      if (showAll) {
        setVisibleProjects(projects);
      } else {
        setVisibleProjects(projects.slice(0, 3));
      }
    }
  }, [showAll, projects]); // Add projects as a dependency
  // const visibleProjects = showAll ? projects : projects.slice(0, 3);




  return (
    <div className="border-b border-neutral-500 pb-4">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl"
      >
        Research and Publications
      </motion.h1>

      <div>
        {visibleProjects.map((project) => (
          <div key={project.id} className="mb-8 flex flex-wrap lg:justify-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4"
            >
              <img src={project.image} width={150} height={150} className="mb-6 rounded" alt={project.title} />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold">{project.title}</h6>
              <p className="mb-4 text-neutral-400">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sky-800 mb-4 text-sm  mt-2 block">
                View Research
              </a>
              <div className="flex flex-wrap  ">
              {project.technologies.map((tech, index) => (

                  <p
                  key={index}
                  className="mr-2 px-2 py-1 mb-2 bg-neutral-900 text-sm font-medium text-purple-900"
                >
                  {tech}
                </p>

              ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {!showAll && projects.length > 3 && (
        <button
          onClick={() => setShowAll(true)}
          className="mx-auto block mt-8 bg-purple-900 text-white px-4 py-2 rounded-lg"
        >
          Show More ↓
        </button>
      )}
    </div>
  );
}
