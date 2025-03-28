import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../../db";

export default function IntroCreate() {
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file)); // Show preview before upload
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageId = null;
            if (imageFile) {
                imageId = await service.uploadFile(imageFile);
            }

            const newAbout = await service.createIntro({ image: imageId, description });
            if (newAbout) {
                navigate("/dashboard/intro"); // Redirect after creation
            }
        } catch (error) {
            console.error("Error creating About section:", error);
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Introduction Section</h2>
                <form onSubmit={handleSubmit}>
                    {/* Image Preview */}
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover mb-4 rounded" />
                    )}

                    {/* Upload Image */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Upload Image</label>
                        <input type="file" onChange={handleImageChange} className="w-full border p-2 rounded mt-1" />
                    </div>

                    {/* Description Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleChange}
                            className="w-full border rounded p-2 mt-1"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
}
