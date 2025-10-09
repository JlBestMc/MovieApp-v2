import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "hero"; // hero = white CTA used in welcome page hero section
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  styles?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  styles = "",
}) => {
  const baseClasses =
    "px-4 py-2 rounded-full font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2";

  const variantClasses: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-blue-950 to-purple-950 text-white hover:from-transparent hover:to-transparent hover:border-purple-900 border-purple-900 border",
    secondary:
      "bg-gradient-to-r from-pink-300 to-orange-200 text-white hover:from-transparent hover:to-transparent hover:border-purple-900 border-purple-900 ",
    tertiary:
      "bg-gradient-to-r from-[#90cea1] to-[#01b4e4] font-bold text-lg text-white rounded-full hover:text-black",
    quaternary:
      "bg-gradient-to-r from-[#90cea1] to-[#01b4e4] text-white hover:from-transparent hover:to-transparent hover:border-cyan-300 border-[#0d253f] border",
    hero:
      "bg-white text-gray-800 shadow-lg shadow-black/30 hover:shadow-xl hover:bg-white/90 px-8 py-3 text-base font-medium  hover:scale-[1.12] transition-transform ease-in-out duration-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${styles}`}
    >
      {children}
    </button>
  );
};

export default Button;
