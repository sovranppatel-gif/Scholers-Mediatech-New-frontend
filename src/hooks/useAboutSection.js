import { useEffect, useState } from "react";
import { FALLBACK_ABOUT } from "../data/landingFallbacks.js";
import { fetchActiveAbout } from "../services/aboutService.js";
import { isPublishedVisibleSection } from "../utils/sectionVisibility.js";

export function useAboutSection() {
  const [aboutData, setAboutData] = useState(FALLBACK_ABOUT);

  useEffect(() => {
    let mounted = true;
    fetchActiveAbout()
      .then((data) => {
        if (!mounted) return;
        setAboutData(isPublishedVisibleSection(data) ? data : FALLBACK_ABOUT);
      })
      .catch(() => {
        if (mounted) setAboutData(FALLBACK_ABOUT);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return {
    aboutData,
    shouldRender: isPublishedVisibleSection(aboutData),
  };
}
