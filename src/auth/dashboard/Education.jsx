import { useEffect, useState } from "react";
import service from "../../db";

export default function Education() {
    const [educationList, setEducationList] = useState([]);
    const [newEducation, setNewEducation] = useState({
        date: "",
        level: "",
        institute: "",
        description: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false); // Separate loading state for saving (create/update)
    const [deletingId, setDeletingId] = useState(null); // Track which entry is being deleted

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        const response = await service.getEducation();
        if (response?.documents) {
            setEducationList(response.documents);
        }
    };

    const handleAddOrUpdateEducation = async () => {
        if (!newEducation.date || !newEducation.level || !newEducation.institute) return;
        setSaving(true);

        if (editingId) {
            // Update Education
            await service.updateEducation({ id: editingId, ...newEducation });
            setEducationList(
                educationList.map((edu) => (edu.$id === editingId ? { ...edu, ...newEducation } : edu))
            );
            setEditingId(null);
        } else {
            // Create New Education
            const createdEducation = await service.createEducation(newEducation);
            if (createdEducation) {
                setEducationList([...educationList, createdEducation]);
            }
        }

        setNewEducation({ date: "", level: "", institute: "", description: "" });
        setSaving(false);
    };

    const handleEdit = (education) => {
        setEditingId(education.$id);
        setNewEducation({
            date: education.date,
            level: education.level,
            institute: education.institute,
            description: education.description,
        });
    };

    const handleDelete = async (id) => {
        setDeletingId(id); // Set deleting state for this specific entry
        await service.deleteEducation(id);
        setEducationList(educationList.filter((edu) => edu.$id !== id));
        setDeletingId(null); // Reset deleting state after deletion
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-transparent shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>

            {/* Add / Edit Education Form */}
            <div className="mb-4 p-4 border rounded">
                <input
                    type="text"
                    placeholder="Date (e.g., 2020 - 2024)"
                    value={newEducation.date}
                    onChange={(e) => setNewEducation({ ...newEducation, date: e.target.value })}
                    className="w-full border p-2 mb-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Level (e.g., Bachelor's, Master's)"
                    value={newEducation.level}
                    onChange={(e) => setNewEducation({ ...newEducation, level: e.target.value })}
                    className="w-full border p-2 mb-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Institute Name"
                    value={newEducation.institute}
                    onChange={(e) => setNewEducation({ ...newEducation, institute: e.target.value })}
                    className="w-full border p-2 mb-2 rounded"
                />
                <textarea
                    placeholder="Description (Optional)"
                    value={newEducation.description}
                    onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                    className="w-full border p-2 mb-2 rounded"
                />
                <button
                    onClick={handleAddOrUpdateEducation}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={saving} // Only disable when saving
                >
                    {saving ? "Saving..." : editingId ? "Update" : "Add"}
                </button>
            </div>

            {/* List of Education Entries */}
            {educationList.length > 0 ? (
                <ul className="space-y-4">
                    {educationList.map((edu) => (
                        <li key={edu.$id} className="p-4 border rounded flex justify-between items-center">
                            <div>
                                <p className="font-bold">{edu.level} - {edu.institute}</p>
                                <p className="text-sm text-gray-500">{edu.date}</p>
                                {edu.description && <p className="text-sm">{edu.description}</p>}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(edu)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    disabled={saving} // Disable edit while saving
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(edu.$id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    disabled={deletingId === edu.$id} // Disable only the deleting item
                                >
                                    {deletingId === edu.$id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No education records added yet.</p>
            )}
        </div>
    );
}
