import { useEffect, useState } from "react";
import service from "../../db";

export default function Technology() {
    const [technologies, setTechnologies] = useState([]);
    const [newTech, setNewTech] = useState("");
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoadingId, setDeleteLoadingId] = useState(null); // Track which item is being deleted

    useEffect(() => {
        fetchTechnologies();
    }, []);

    const fetchTechnologies = async () => {
        const response = await service.getTechnologies();
        if (response?.documents) {
            setTechnologies(response.documents);
        }
    };

    const handleAddTechnology = async () => {
        if (!newTech.trim()) return;
        setAddLoading(true);
        const newTechnology = await service.createTechnology({ name: newTech });
        if (newTechnology) {
            setTechnologies([...technologies, newTechnology]);
            setNewTech(""); // Clear input
        }
        setAddLoading(false);
    };

    const handleDeleteTechnology = async (id) => {
        setDeleteLoadingId(id); // Set only for the deleting item
        await service.deleteTechnology(id);
        setTechnologies(technologies.filter((tech) => tech.$id !== id));
        setDeleteLoadingId(null); // Reset after deletion
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-transparent shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Technologies</h2>

            {/* Add Technology Input */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter technology name..."
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <button
                    onClick={handleAddTechnology}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={addLoading}
                >
                    {addLoading ? "Adding..." : "Add"}
                </button>
            </div>

            {/* List of Technologies */}
            {technologies.length > 0 ? (
                <ul className="space-y-2">
                    {technologies.map((tech) => (
                        <li key={tech.$id} className="flex justify-between text-white bg-transparent p-2 rounded">
                            <span>{tech.name}</span>
                            <button
                                onClick={() => handleDeleteTechnology(tech.$id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                disabled={deleteLoadingId === tech.$id}
                            >
                                {deleteLoadingId === tech.$id ? "Deleting..." : "Delete"}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No technologies added yet.</p>
            )}
        </div>
    );
}
