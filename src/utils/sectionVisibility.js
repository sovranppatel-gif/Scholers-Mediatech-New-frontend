/** True when a CMS section should render on the public landing page. */
export function isPublishedVisibleSection(data) {
  return (
    Boolean(data) &&
    data.isVisible !== false &&
    String(data.publishStatus || "").toLowerCase() === "published"
  );
}

/** Ensure form payloads always send an explicit boolean (unchecked checkbox → false). */
export function withExplicitVisibility(values = {}) {
  return {
    ...values,
    isVisible: Boolean(values.isVisible),
  };
}
