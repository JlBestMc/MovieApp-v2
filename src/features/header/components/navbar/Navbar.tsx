import Button from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../auth/context/AuthContextBase";
import { auth } from "../../../../auth/firebase";
import { signOut } from "firebase/auth";

interface NavbarProps {
  logo: string;
  bgColor?: string;
  aStyles?: string;
  borderColor?: string;
  variantButton?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "hero";
  mode?: "default" | "hero";
}

export default function Navbar({
  logo,
  bgColor,
  aStyles,
  borderColor,
  variantButton,
  mode = "default",
}: NavbarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Shared link button styling for hero mode
  const heroLinkBase =
    "relative group uppercase tracking-wider font-medium transition-colors";
  const heroUnderline =
    "absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full";

  if (mode === "hero") {
    return (
      <nav className="fixed top-0 left-0 w-full z-30 text-white font-medium tracking-wide backdrop-blur-sm ">
        <div className="relative w-full max-w-7xl mx-auto flex items-center py-7 px-8 md:px-16">
          {/* Left group */}
            <div className="flex items-center justify-between gap-16 lg:gap-24 text-[11px] sm:text-xs md:text-sm lg:text-base">
              <button
                onClick={() => navigate("/journey")}
                className={heroLinkBase}
              >
                <span className="group-hover:text-white/80">JOURNEY</span>
                <span className={heroUnderline} />
              </button>
              <button
                onClick={() => navigate("/stories")}
                className={`${heroLinkBase} hidden sm:inline-block`}
              >
                <span className="group-hover:text-white/80">STORIES</span>
                <span className={heroUnderline} />
              </button>
            </div>

          {/* Center logo absolutely centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-7 sm:w-8 md:w-20 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="Logo" className="w-full h-auto" />
            </div>
          </div>

          {/* Right group */}
          <div className="ml-auto flex items-center gap-16 lg:gap-24 text-[11px] sm:text-xs md:text-sm lg:text-base">
            <button
              onClick={() => navigate("/about")}
              className={`${heroLinkBase} hidden sm:inline-block`}
            >
              <span className="group-hover:text-white/80">ABOUT</span>
              <span className={heroUnderline} />
            </button>
            <button onClick={() => navigate("/contact")} className={heroLinkBase}>
              <span className="group-hover:text-white/80">CONTACT</span>
              <span className={heroUnderline} />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Default mode (original app navbar)
  return (
    <div
      className={`flex ${bgColor} flex-col md:flex-row justify-between items-center p-4 px-16 text-black-300`}
    >
      <div className="w-32 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="w-full h-auto" />
      </div>
      <div
        className={`flex justify-between items-center space-x-4 gap-3 md:my-0 my-5 font-semibold border ${borderColor} rounded-full px-12 py-2`}
      >
        <a onClick={() => navigate("/movies")} className={aStyles}>
          Movies
        </a>
        <a className={aStyles}>TV Shows</a>
        <a className={aStyles}>People</a>
        <a className={aStyles}>More</a>
      </div>
      {user ? (
        <div className="flex justify-between items-center space-x-3  font-semibold">
          <Button styles="px-14" variant={variantButton} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center space-x-3  font-semibold">
            <Button variant={variantButton} onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant={variantButton} onClick={() => navigate("/register")}>
              Register
            </Button>
        </div>
      )}
    </div>
  );
}
