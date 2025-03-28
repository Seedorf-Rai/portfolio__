import { useEffect, useState } from "react";
import service from "../db";

export default function Contact() {
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
      {user ? (
        <div className="border-b border-neutral-900 pb-20">
          <h1 className="my-10 text-center text-4xl">Contact</h1>
          <div className="text-center tracking-tighter">
            <p className="my-4">{user.address}</p>
            <p className="my-4">Phone: {user.phone_number}</p>
            <a href={`mailto:${user.gmail}`} className="border-b">
              {user.gmail}
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
