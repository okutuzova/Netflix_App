import placeholderMovie from "../../assets/placeholderMovie.jpg";

export default function MediaPoster({ media }) {
  const imagePath = media.poster_path;
  const title = media.title || media.name;

  return (
    <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center">
      <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 max-w-md">
        <img
          src={
            imagePath
              ? `https://image.tmdb.org/t/p/w500${imagePath}`
              : placeholderMovie
          }
          alt={title}
          className="w-full h-auto object-cover"
        />
        {/* Overlay with shadows on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
      </div>
    </div>
  );
}
