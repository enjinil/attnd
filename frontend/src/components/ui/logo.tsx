import clsx from "clsx";

const Logo = ({ className }: { className?: string }) => (
  <span
    className={clsx(
      "text-xl font-bold text-teal-500 tracking-tighter",
      className
    )}
  >
    Attnd
  </span>
);

export default Logo;
