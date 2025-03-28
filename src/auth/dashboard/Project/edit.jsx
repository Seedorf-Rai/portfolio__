import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import service from "../../../db";

export default function EditProject() {
    const location = useLocation();
    const navigate = useNavigate();
    const project = location.state?.project;

    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        link: project?.link || "",
        technologies: project?.technologies || []
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await service.updateProject({
                id: project.$id,
                ...formData
            });
            navigate("/dashboard/project");
        } catch (error) {
            console.error("Error updating project:", error);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-4  rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Project Link</label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Project"}
                </button>
            </form>
        </div>
    );
}
