import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../../db";

export default function AboutEdit() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [aboutId, setAboutId] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await service.getAbout();
        if (response?.documents?.length > 0) {
          const aboutData = response.documents[0]; // Fetch the first document
          setDescription(aboutData.description);
          setAboutId(aboutData.$id);
        }
      } catch (error) {
        console.error("Error fetching About section:", error);
      }
    };

    fetchAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aboutId) {
      console.error("No About document found!");
      return;
    }

    const updated = await service.updateAbout({ id: aboutId, description });

    if (updated) {
      navigate("/dashboard/about"); // Redirect after update
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit About</h2>

        <form onSubmit={handleSubmit}>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2 mt-1"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-900"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
