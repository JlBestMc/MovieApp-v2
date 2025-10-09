import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import logo2 from "../../assets/white-logo.svg";
import Navbar from "../../features/header/components/navbar/Navbar";
import darklogo from "../../assets/logo-dark.svg";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/");
    } catch (err) {
      let message = "Error al registrar el usuario.";
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            message = "El correo ya está en uso.";
            break;
          case "auth/invalid-email":
            message = "El correo no es válido.";
            break;
          case "auth/weak-password":
            message = "La contraseña es demasiado débil (mín. 6 caracteres).";
            break;
          default:
            message = err.message || message;
        }
      }
      console.error("Register error:", err);
      setError(message);
    }
  };

  return (
    <>
      <Navbar
        logo={logo2}
      />
      <div className="bg-[url('@/assets/Rectangle.jpg')] bg-cover bg-center items-center justify-center min-h-screen flex h-full bg-fixed bg-no-repeat">
        <form onSubmit={handleRegister}>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-5 justify-center">
                  <img src={darklogo} alt="Logo" className="h-16" />
                </div>
                <div className="mt-5">
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  <label
                    className="font-semibold text-md text-gray-600 pb-1 block"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    required
                  />
                  <label
                    className="font-semibold text-md text-gray-600 pb-1 block"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    required
                  />
                  <label
                    className="font-semibold text-md text-gray-600 pb-1 block"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    required
                  />
                </div>
                <div className="flex justify-center w-full items-center"></div>
                <div className="mt-5">
                  <button
                    className="py-2 px-35 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  <a
                    className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    href="/login"
                  >
                    or sign in
                  </a>
                  <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
