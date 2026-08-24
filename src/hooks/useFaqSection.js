import { useEffect, useState } from "react";
import { FALLBACK_FAQ } from "../data/landingFallbacks.js";
import { fetchActiveFaq } from "../services/faqService.js";
import { isPublishedVisibleSection } from "../utils/sectionVisibility.js";

export function useFaqSection() {
  const [faqData, setFaqData] = useState(FALLBACK_FAQ);

  useEffect(() => {
    let mounted = true;
    fetchActiveFaq()
      .then((data) => {
        if (!mounted) return;
        setFaqData(isPublishedVisibleSection(data) ? data : FALLBACK_FAQ);
      })
      .catch(() => {
        if (mounted) setFaqData(FALLBACK_FAQ);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    faqData,
    shouldRender: isPublishedVisibleSection(faqData),
  };
}
