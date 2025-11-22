import { useNavigate } from "react-router-dom";

export default function ErrorPage({ message }) {
const navigate = useNavigate();

return ( <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6"> <h1 className="text-6xl md:text-8xl font-bold mb-6">Oops!</h1> <p className="text-xl text-gray-300 mb-4">
{message || "The page you are looking for does not exist."} </p>
<button
onClick={() => navigate("/")}
className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
>
Go Back Home </button> </div>
);
}
