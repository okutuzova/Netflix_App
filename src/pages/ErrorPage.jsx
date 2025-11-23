import { useNavigate } from "react-router-dom";

/**
 * ErrorPage 
 *
 * A simple full-screen error screen used to display a custom message
 * when something goes wrong or when a user lands on an invalid route.
 *
 * Features:
 * - Shows a custom error message (or a default fallback message)
 * - Includes a button that redirects the user back to the home page
 *
 * Props:
 * @param {Object} props
 * @param {string} [props.message] - Optional error message to display.
 *                                   If omitted, a default “page not found” is shown. 

 */
export default function ErrorPage({ message }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      {" "}
      <h1 className="text-6xl md:text-8xl font-bold mb-6">Oops!</h1>{" "}
      <p className="text-xl text-gray-300 mb-4">
        {message || "The page you are looking for does not exist."}{" "}
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
      >
        Go Back Home{" "}
      </button>{" "}
    </div>
  );
}
