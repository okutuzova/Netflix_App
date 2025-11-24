export default function HeroDivider() {
  return (
    <>
      {/* Curve in the lower part of hero  */}
      <div
        className="relative h-20 w-full bg-black -mb-1"
        style={{
          clipPath: "ellipse(80% 50% at 50% 100%)",
        }}
      >
        {/* COlored line ver the curve */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-purple-600 to-red-600"
          style={{
            transform: "translateY(-1px)",
          }}
        ></div>
      </div>
    </>
  );
}
