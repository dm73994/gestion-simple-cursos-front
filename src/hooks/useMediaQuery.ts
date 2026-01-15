import { useEffect, useState } from "react";

interface UseMediaQueryProps {
  query: string;
}

const useMediaQuery = ({ query }: UseMediaQueryProps) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return {
    matches,
  };
};

export default useMediaQuery;
