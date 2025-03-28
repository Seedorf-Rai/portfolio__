import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../db";

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
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
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this research ?")) return;

        try {
            await service.deleteRandD(projectId);
            setProjects((prevProjects) => prevProjects.filter((p) => p.$id !== projectId));
        } catch (error) {
            console.error("Error deleting research:", error);
        }
    };

    const handleEdit = (project) => {
        navigate(`/dashboard/randd/edit/${project.$id}`, { state: { project } });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="py-5">
            <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/dashboard/randd/create">
                Add Research and Development
            </Link>
            <div className="grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.$id} className="p-4 border rounded-lg shadow">
                        {project.image && <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded" />}
                        <h3 className="text-xl font-semibold mt-2">{project.title}</h3>
                        <p className="text-gray-600">
                            {
                                project.description.length > 100
                                    ? `${project.description.substring(0, 100)}...`
                                    : project.description
                            }
                        </p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
                            View Research
                        </a>
                        <div className="mt-2">
                            {project.technologies?.map((tech, index) => (
                                <span key={index} className="bg-gray-800 text-sm px-2 py-1 rounded-full mr-2">{tech}</span>
                            ))}
                        </div>
                        <div className="mt-3 flex space-x-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(project.$id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Project;
