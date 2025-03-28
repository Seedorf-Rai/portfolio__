import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../appwrite";

function Layout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.isLoggedIn();
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <>
      <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
        <div className="fixed top-0 -z-10 h-full w-full"></div>
        <div className="absolute top-0 z-[-2] min-h-[100vh] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">

          {/* Sidebar */}
          <aside className="fixed left-0 top-0 h-full w-64 bg-[#151526] p-5 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Admin Panel</h2>
              <nav>
                <ul className="space-y-3">
                  <li><Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">Personal Settings</Link></li>
                  <li><Link to="/dashboard/about" className="block px-4 py-2 rounded hover:bg-gray-700">About Me</Link></li>
                  <li><Link to="/dashboard/intro" className="block px-4 py-2 rounded hover:bg-gray-700">Introduction</Link></li>
                  <li><Link to="/dashboard/technology" className="block px-4 py-2 rounded hover:bg-gray-700">Technologies</Link></li>
                  <li><Link to="/dashboard/education" className="block px-4 py-2 rounded hover:bg-gray-700">Education</Link></li>
                  <li><Link to="/dashboard/project" className="block px-4 py-2 rounded hover:bg-gray-700">Projects</Link></li>
                  <li><Link to="/dashboard/randd" className="block px-4 py-2 rounded hover:bg-gray-700">Research & Development</Link></li>
                </ul>
              </nav>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
            >
              Logout
            </button>
          </aside>

          {/* Main Content */}
          <main className="ml-64 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
