export const PATHS = {
  root: "/",
  welcome: "/welcome",
  login: "/login",
  register: "/register",
  movies: "/movies",
  movie: (id: string | number) => `/movie/${id}`,
  actor: (id: string | number) => `/actor/${id}`,
} as const;

export type AppPathKey = keyof typeof PATHS;