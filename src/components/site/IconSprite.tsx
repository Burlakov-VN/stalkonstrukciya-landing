// Shared 4×2 sprite reader for the generated icon sets
// (icons-process.png, icons-industries.png — both cut from the same grid).
export function IconSprite({
  src,
  col,
  row,
  size = 32,
  className = "",
}: {
  src: string;
  col: 0 | 1 | 2 | 3;
  row: 0 | 1;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${src})`,
        backgroundSize: "400% 200%",
        backgroundPosition: `${(col / 3) * 100}% ${row * 100}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
