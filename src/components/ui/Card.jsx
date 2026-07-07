import React from "react";

export default function Card({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  download,
  hoverTranslate = true,
  hoverShadow = true,
  padding = "p-6",
}) {
  const baseStyle =
    "rounded-[24px] border border-white/5 bg-white/[0.01] backdrop-blur-md transition-all duration-300 flex flex-col text-left";

  const hoverStyle = `
    ${hoverTranslate ? "hover:-translate-y-1" : ""}
    ${hoverShadow ? "hover:bg-white/[0.03] hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_20px_rgba(34,211,238,0.03)]" : ""}
  `.trim();

  const combinedClassName = `${baseStyle} ${hoverStyle} ${padding} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
        className={`${combinedClassName} cursor-pointer block`}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${combinedClassName} ${onClick ? "cursor-pointer" : ""}`}
    >
      {children}
    </div>
  );
}
