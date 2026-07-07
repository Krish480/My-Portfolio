import React from "react";

export default function Button({
  children,
  variant = "primary",
  href,
  download,
  target,
  rel,
  onClick,
  icon: Icon,
  className = "",
}) {
  const baseStyle =
    "px-8 h-[48px] inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] text-sm cursor-pointer hover:scale-[1.015] hover:-translate-y-[2px] active:scale-[0.975] active:translate-y-0 select-none shadow-md hover:shadow-lg";

  const variantStyles = {
    primary:
      "bg-white text-black border border-white hover:bg-white/90 hover:shadow-white/5",
    secondary:
      "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white hover:shadow-white/[0.02]",
    cyan:
      "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-cyan-500/10",
  };

  const combinedClassName = `${baseStyle} ${variantStyles[variant] || ""} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        className={combinedClassName}
      >
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}
