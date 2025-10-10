import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import RegisterPage from "./pages/registerPage/registerPage";
import MoviePage from "./pages/moviePage/MoviePage";
import MovieDetailPage from "./pages/movieDetailsPage/movieDetailsPage";
import ActorDetailsPage from "./pages/actorDetailsPage/ActorDetailsPage";
import { AuthProvider } from "./auth/context/AuthContext"; 
import WelcomePage from "./pages/welcomePage/WelcomePage";
import Footer from "./features/footer/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import { PATHS } from "./routes/paths";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Ruta raíz y welcome */}
          <Route path={PATHS.root} element={<WelcomePage />} />
          <Route path={PATHS.welcome} element={<WelcomePage />} />
          <Route path={PATHS.login} element={<LoginPage />} />
          <Route path={PATHS.register} element={<RegisterPage />} />
          <Route
            path={PATHS.movies}
            element={
              <ProtectedRoute>
                <MoviePage />
              </ProtectedRoute>
            } 
          />
          <Route
            path={PATHS.movie(":id")}
            element={
              <ProtectedRoute>
                <MovieDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.actor(":id")}
            element={
              <ProtectedRoute>
                <ActorDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
