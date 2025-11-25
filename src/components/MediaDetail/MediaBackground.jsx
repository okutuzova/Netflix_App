import placeholderMovie from "../../assets/placeholderMovie.jpg";

export default function MediaBackground({ media }) {
    const imagePath = media.poster_path;
    return (

<div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-200"
          style={{
            backgroundImage: `url(${
              imagePath
                ? `https://image.tmdb.org/t/p/original${imagePath}`
                : placeholderMovie
            })`,
          }}
        ></div>
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
    )
}
