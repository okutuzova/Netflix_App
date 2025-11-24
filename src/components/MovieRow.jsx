import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import placeholderMovie from "../assets/placeholderMovie.jpg";
import { useNavigate } from "react-router-dom";

/**
 * A component to display a horizontal line of movies
 * @param {Object} props
 * @param {string} props.title - Section Title (example, "Trending Now")
 * @param {Function} props.fetchFunction - function returns a promise with data from TMDB
 */
export default function MovieRow({
  title,
  fetchFunction,
  showRanking = false,
  type = "movie" 
}) {
  const { data: items, loading, error } = useFetch(fetchFunction);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  /**
 * Scrolls the horizontal container left or right by approximately 90% of its width.
 * Behavior:
 * - Retrieves the DOM element from `scrollRef.current`.
 * - Calculates the scroll distance as 90% of the container's visible width (`clientWidth`).
 * - Updates the `scrollLeft` position of the container smoothly.
 * - If `scrollRef.current` is null (not mounted), the function does nothing.
 *
 * Example usage:
 * scroll('left');  // Scrolls the container to the left
 * scroll('right'); // Scrolls the container to the right
 */
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.9;
    const target = direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;
    container.scrollTo({
      left: target,
      behavior: "smooth", // triggers smooth animated scrolling
    });
  };

  if (loading)
    return (
      <div className="text-gray-400 text-center p-4 animate-pulse">
        Loading {title}...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center p-4">
        Error loading {title}: {error}
      </div>
    );

  return (
    <section className="relative text-white px-8 py-6 group">
      {/* Navigation Arrows */}
      <button
        onClick={() => scroll("left")}
        className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition z-10 cursor-pointer"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition z-10 cursor-pointer"
      >
        <ChevronRight size={28} />
      </button>
      
      <div className=" px-30 text-white pt-10">
        <h2 className="font-bold text-2xl mb-2">{title}</h2>


        <div 
        ref = {scrollRef}
        className="flex gap-10 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory">
          {items.map((item, index) => {
            return (
              <div
                key={item.id}
                index={index + 1}
                className="relative min-w-[180px] group transform hover:scale-105 transition duration-300 cursor-pointer snap-start"
                onClick={() => navigate(`/${type}/${item.id}`)}
              >
                {showRanking && (
                  <span className="absolute -left-1 bottom-0 text-[100px] font-extrabold text-stroke-white">
                    {index + 1}
                  </span>
                )}
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : placeholderMovie
                  }
                  className="rounded-xl w-full h-[260px] object-cover shadow-lg"
                  alt={item.name}
                />

                

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
