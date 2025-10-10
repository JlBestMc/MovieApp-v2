import type { RefObject } from "react";
import { useEffect } from "react";

export function usePlaybackRate(
  videoRef: RefObject<HTMLVideoElement | null>,
  rate: number = 1
) {
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const apply = () => {
      try {
        el.playbackRate = rate;
      } catch {
        // no-op
      }
    };

    apply();
    el.addEventListener("loadedmetadata", apply);
    el.addEventListener("loadeddata", apply);
    el.addEventListener("play", apply);

    return () => {
      el.removeEventListener("loadedmetadata", apply);
      el.removeEventListener("loadeddata", apply);
      el.removeEventListener("play", apply);
    };
  }, [videoRef, rate]);
}

export default usePlaybackRate;