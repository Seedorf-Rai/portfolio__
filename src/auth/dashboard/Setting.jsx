import { useEffect, useState } from "react";
import service from "../../db";
import { Link } from "react-router-dom";

export default function Setting() {
  const [setting, setSetting] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await service.getSetting();
      if (response?.documents?.length > 0) {
        setSetting(response.documents[0]); // Take the first document
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="flex  h-screen">
      {setting ? (
        <div className="p-6 bg-transparent shadow-lg rounded-lg w-96">
          <h2 className="text-xl font-bold mb-2">{setting.name}</h2>
          <p className="text-gray-600">{setting.designation}</p>
          <div className="mt-4">
            <p><strong>LinkedIn:</strong> <a href={setting.linkedin} target="_blank" className="text-blue-600">{setting.linkedin}</a></p>
            <p><strong>GitHub:</strong> <a href={setting.github} target="_blank" className="text-gray-700">{setting.github}</a></p>
            <p><strong>Instagram:</strong> <a href={setting.instagram} target="_blank" className="text-pink-500">{setting.instagram}</a></p>
            <p><strong>Email:</strong> {setting.gmail}</p>
            <p><strong>Phone:</strong> {setting.phone_number}</p>
            <p><strong>Address:</strong> {setting.address}</p>
          </div>
          <Link to={`/dashboard/setting/edit/${setting.$id}`}>
          <button className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-900">
            Edit
          </button>
          </Link>
        </div>
      ) : (
        <p>Loading settings...</p>
      )}
    </div>
  );
}
