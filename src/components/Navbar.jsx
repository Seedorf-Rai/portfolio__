
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <nav className="mb-20  flex py-6 items-center justify-between">
        <div className="flex flex-shrink-0 items-center">
          <h2>Palash Ghosal</h2>
        </div>
        <div className="m-8 flex items-center justify-cente gap-4 text-2xl">
            <FaLinkedin></FaLinkedin>
            <FaGithub></FaGithub>
            <FaInstagram></FaInstagram>
        </div>
      </nav>
    </>
  );
}
