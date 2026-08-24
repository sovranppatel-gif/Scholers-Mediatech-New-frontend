import { useEffect, useState } from "react";
import { FALLBACK_CASE_STUDY } from "../data/landingFallbacks.js";
import { fetchActiveCaseStudy } from "../services/caseStudyService.js";
import { isPublishedVisibleSection } from "../utils/sectionVisibility.js";

export function useCaseStudyStrip() {
  const [caseStudyData, setCaseStudyData] = useState(FALLBACK_CASE_STUDY);

  useEffect(() => {
    let mounted = true;
    fetchActiveCaseStudy()
      .then((data) => {
        if (!mounted) return;
        setCaseStudyData(isPublishedVisibleSection(data) ? data : FALLBACK_CASE_STUDY);
      })
      .catch(() => {
        if (mounted) setCaseStudyData(FALLBACK_CASE_STUDY);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    caseStudyData,
    shouldRender: isPublishedVisibleSection(caseStudyData),
  };
}
