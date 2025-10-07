import Navbar from "@/features/header/components/navbar/Navbar";
import Button from "../../components/Button/Button";
import logoDark from "@/assets/white-logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export default function Main() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen text-white">
      {/* Navbar (hero mode) */}
      <Navbar logo={logoDark}/>

      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" aria-hidden="true" />

      {/* Hero Content */}
      <div className="relative flex flex-col items-center text-center mt-22 px-4 max-w-3xl">
        <h1 className="font-light text-4xl sm:text-5xl md:text-6xl leading-tight">
          <span className="font-light">Choose your path,</span>
          <br />
          <span className="italic font-serif font-medium">find your way</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-white/85 max-w-2xl">
          Good things take time. We're here for the details, the rhythm, and
          the quiet in-between.
        </p>
        <div className="mt-10">
          {user ? (
            <Button variant="hero" onClick={() => navigate("/movies")}>Explore Movies</Button>
          ) : (
            <Button variant="hero" onClick={() => navigate("/login")}>Start the Journey</Button>
          )}
        </div>
      </div>

      {/* Corner captions */}
      <div className="absolute bottom-6 left-6 text-xs sm:text-sm text-white/85 tracking-wide">
        [Some paths aren't meant to be rushed]
      </div>
      <div className="absolute bottom-6 right-6 text-xs sm:text-sm text-white/85 tracking-wide flex items-center gap-2">
        <span className="text-lg leading-none">•</span> [Rhythms of 2025]
      </div>
    </div>
  );
}
