import { useEffect, useState } from "react";
import { FALLBACK_EXPERTISE } from "../data/landingFallbacks.js";
import { fetchActiveExpertise } from "../services/expertiseService.js";
import { isPublishedVisibleSection } from "../utils/sectionVisibility.js";

export function useExpertiseSection() {
  const [expertiseData, setExpertiseData] = useState(FALLBACK_EXPERTISE);

  useEffect(() => {
    let mounted = true;
    fetchActiveExpertise()
      .then((data) => {
        if (!mounted) return;
        setExpertiseData(isPublishedVisibleSection(data) ? data : FALLBACK_EXPERTISE);
      })
      .catch(() => {
        if (mounted) setExpertiseData(FALLBACK_EXPERTISE);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    expertiseData,
    shouldRender: isPublishedVisibleSection(expertiseData),
  };
}
