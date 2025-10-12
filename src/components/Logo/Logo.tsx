import logo from "../../assets/white-logo.svg";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  width?: string;
  styles?: string;
}

export default function Logo({ width, styles  }: LogoProps) {
  const navigate = useNavigate();

  return (

      <button
        onClick={() => navigate("/")}
        className={`focus:outline-none ${styles} focus-visible:ring-2 focus-visible:ring-white/70 rounded-md`}
      >
        <img
          src={logo}
          alt="Logo"
          className={`w-14 ${width} h-auto drop-shadow-[0_0_10px_rgba(0,0,0,0.35)] hover:scale-[1.1] transition-transform ease-in-out duration-500`}
        />
      </button>

  );
}
