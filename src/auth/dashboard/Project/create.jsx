import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../../db";

function CreateProject() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        link: "",
        technologies: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageId = "";
            if (formData.image) {
                imageId = await service.uploadFile(formData.image); // ✅ Store only the file ID
            }

            const projectData = {
                title: formData.title,
                description: formData.description,
                link: formData.link,
                technologies: formData.technologies.split(",").map((tech) => tech.trim()),
                image: imageId, // ✅ Save only the image ID
            };
             console.log(projectData);

            await service.createProject(projectData);
            navigate("/dashboard/project");
        } catch (error) {
            console.error("Error creating project:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-lg mx-auto p-6 bg-transparent rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mt-6">
                    <label className="block font-semibold">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mt-6">
                    <label className="block font-semibold">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mt-6">
                    <label className="block font-semibold">Project Link:</label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mt-6">
                    <label className="block font-semibold">Technologies (comma-separated):</label>
                    <input
                        type="text"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mt-6">
                    <label className="block font-semibold">Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    {loading ? "Creating..." : "Create Project"}
                </button>
            </form>
        </div>
    );
}

export default CreateProject;
