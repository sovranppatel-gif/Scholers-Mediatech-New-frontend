import { useEffect, useState } from "react";
import { FALLBACK_SERVICES } from "../data/landingFallbacks.js";
import { fetchActiveServices } from "../services/servicesService.js";
import { isPublishedVisibleSection } from "../utils/sectionVisibility.js";

export function useServicesSection() {
  const [servicesData, setServicesData] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    let mounted = true;
    fetchActiveServices()
      .then((data) => {
        if (!mounted) return;
        setServicesData(isPublishedVisibleSection(data) ? data : FALLBACK_SERVICES);
      })
      .catch(() => {
        if (mounted) setServicesData(FALLBACK_SERVICES);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    servicesData,
    shouldRender: isPublishedVisibleSection(servicesData),
  };
}
