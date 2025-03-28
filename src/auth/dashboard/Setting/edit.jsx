import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../../db";

export default function EditSetting() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    linkedin: "",
    github: "",
    instagram: "",
    gmail: "",
    phone_number: "",
    address: ""
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await service.getSetting();
      if (response?.documents?.length > 0) {
        const settingData = response.documents.find(doc => doc.$id === id);
        if (settingData) {
          setFormData(settingData);
        }
      }
    };

    fetchSettings();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!id) {
    console.error("ID is undefined");
    return;
  }

  console.log(id);

  const updated = await service.updateSetting({
    id:id, // Explicitly pass id
    ...formData
  });

  if (updated) {
    navigate("/dashboard");
  }
};


  return (
    <div className="flex">
      <form className="p-6 bg-transparent shadow-lg rounded-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700">{key.replace("_", " ")}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-900"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
