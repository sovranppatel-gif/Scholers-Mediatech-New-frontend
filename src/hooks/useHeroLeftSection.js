import { useEffect, useState } from "react";
import { FALLBACK_HERO_LEFT } from "../data/landingFallbacks.js";
import { fetchActiveHeroLeft } from "../services/heroLeftService.js";
import { isPublishedVisibleSection } from "../utils/sectionVisibility.js";

export function useHeroLeftSection() {
  const [heroLeftData, setHeroLeftData] = useState(FALLBACK_HERO_LEFT);

  useEffect(() => {
    let mounted = true;
    fetchActiveHeroLeft()
      .then((data) => {
        if (!mounted) return;
        setHeroLeftData(isPublishedVisibleSection(data) ? data : FALLBACK_HERO_LEFT);
      })
      .catch(() => {
        if (mounted) setHeroLeftData(FALLBACK_HERO_LEFT);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    heroLeftData,
    shouldRender: isPublishedVisibleSection(heroLeftData),
  };
}
