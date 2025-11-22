import { useNavigate } from "react-router-dom";
import logoNetflix from "../assets/Netflix-Logo.png";
/**
 * NavbarSecond Component
 *
 * A responsive top navigation bar used on the site with:
 * - Left: Logo (click navigates to home)
 * - Center: Navigation buttons (Movies, Series, My List)
 * - Right: Empty space to balance layout
 *
 * Features:
 * - Navigation handled via `useNavigate` from react-router-dom
 * - Hover effects for clear feedback
 *
 * @component
 * @example
 * <NavbarSecond />
 */
export default function NavbarSecond() {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-black bg-opacity-80 px-6 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src={logoNetflix}
          alt="NETFLIX"
          className="h-8 md:h-10 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Center: Navigation buttons */}
      <div className="hidden md:flex items-center justify-center gap-6 text-sm font-medium text-gray-300">
        <button
          onClick={() => navigate("/movies")}
          className="hover:text-white transition duration-200 cursor-pointer"
        >
          Movies
        </button>
        <button
          onClick={() => navigate("/series")}
          className="hover:text-white transition duration-200 cursor-pointer"
        >
          Series
        </button>
       
        <button
          onClick={() => navigate("/favorites")}
          className="hover:text-white transition duration-200 cursor-pointer"
        >
          My List
        </button>
      </div>

      {/* Right:empty space for balance */}
      <div className="w-20 md:w-24"></div>
    </nav>
  );
}