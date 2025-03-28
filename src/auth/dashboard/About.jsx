import { useEffect, useState } from "react";
import service from "../../db";
import { Link } from "react-router-dom";

export default function About() {
  const [about, setAbout] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await service.getAbout();
        if (response?.documents?.length > 0) {
          const aboutData = response.documents[0]; // Taking the first document
          setAbout(aboutData);

          if (aboutData.image) {
            // Fetch the file preview URL from Appwrite Storage
            const fileUrl = await service.getFileURL(aboutData.image);
            setImageURL(fileUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching About section:", error);
      }
      setLoading(false);
    };

    fetchAbout();
  }, []);

  const handleDelete = async () => {
    if (!about) return;

    const confirmDelete = window.confirm("Are you sure you want to delete the About section?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await service.deleteAbout(about.$id);
      setAbout(null); // Remove from UI after deletion
      setImageURL(null);
    } catch (error) {
      console.error("Error deleting About section:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="max-w-2xl bg-transparent">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : about ? (
          <>
            {imageURL && (
              <img
                src={imageURL}
                alt="About"
                className="w-full h-64 object-cover"
              />
            )}
            <div className="py-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">About Me</h2>
              <p className="text-gray-500">{about.description}</p>
            </div>
            <div className="flex gap-4">
              <Link
                to={"/dashboard/about/edit/" + about.$id}
                className="px-6 py-2 rounded bg-blue-500 text-white text-center"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-6 py-2 rounded bg-red-500 text-white text-center"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </>
        ) : (
       <div>
          <p className="p-6 text-gray-500">No About Section</p>
          <Link className="px-6 py-2 rounded bg-blue-500 text-white text-center" to="/dashboard/about/add">
           Add About Section
          </Link>
       </div>
)}
      </div>
    </div>
  );
}
