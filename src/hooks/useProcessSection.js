import { useEffect, useState } from "react";
import { FALLBACK_PROCESS } from "../data/landingFallbacks.js";
import { fetchActiveProcess } from "../services/processService.js";
import { isPublishedVisibleSection } from "../utils/sectionVisibility.js";

export function useProcessSection() {
  const [processData, setProcessData] = useState(FALLBACK_PROCESS);

  useEffect(() => {
    let mounted = true;
    fetchActiveProcess()
      .then((data) => {
        if (!mounted) return;
        setProcessData(isPublishedVisibleSection(data) ? data : FALLBACK_PROCESS);
      })
      .catch(() => {
        if (mounted) setProcessData(FALLBACK_PROCESS);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    processData,
    shouldRender: isPublishedVisibleSection(processData),
  };
}
