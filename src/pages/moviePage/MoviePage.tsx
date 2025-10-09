// src/pages/MovieListPage.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../../config/tmdb";
import MovieCard from "../../components/Card/MovieCard";
import { useEffect, useRef } from "react";
import type { Movie } from "../../types/movieTypes";
import Navbar from "../../features/header/components/navbar/Navbar";
import logo2 from "../../assets/white-logo.svg";

export default function MoviePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popular-movies"],
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) => fetchPopularMovies(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
    });

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <div className="bg-[url('@/assets/Rectangle.jpg')] bg-cover bg-center h-full bg-fixed bg-no-repeat">
        <Navbar
          logo={logo2}
        />
        <div className="grid grid-cols-2 md:grid-cols-5 md:mx-16 mx-6 gap-6 mt-8">
          {data?.pages.map((page) =>
            page.results.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
          <div ref={loadMoreRef} className="h-10 col-span-full" />
          {isFetchingNextPage && (
            <p className="col-span-full text-center">Cargando más...</p>
          )}
        </div>
      </div>
    </>
  );
}
