import placeholderMovie from "../../assets/placeholderMovie.jpg";

/**
 * MediaBackground component
 *
 * Renders a blurred background image using the movie/series poster.
 * If a poster is not available, a local placeholder image is used instead.
 *
 * A dark transparent overlay is applied on top of the background for better contrast
 * with foreground content.
 *
 * @component
 * @param {Object} props                 - Component props.
 * @param {Object} props.media           - Media object containing image data.
 * @param {string} [props.media.poster_path] - Relative path to the media poster image.
 */
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
