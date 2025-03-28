import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import service from "../db";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await service.getSetting();
        if (response?.documents?.length > 0) {
          setUser(response.documents[0]); // Take the first document
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {!loading && user ? (
        <nav className="mb-20  flex py-6 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <h2>{user.name}</h2>
          </div>
          <div className="m-8 flex items-center justify-cente gap-4 text-2xl">
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            )}
            <a href={user.github} target="_blank" rel="noopener noreferrer">
              <FaGithub></FaGithub>
            </a>
            <a href={user.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram></FaInstagram>
            </a>
          </div>
        </nav>
      ) : (
        <div className="flex h-[100vh] justify-center mt-10">
          <p className="p-6 text-gray-500">Loading...</p>
        </div>
      )}
    </>
  );
}
