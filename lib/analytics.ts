const ANON_ID_STORAGE_KEY = "personal-portfolio-anonymous-id";

const createAnonymousId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `anon_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

export const getAnonymousId = () => {
  if (typeof window === "undefined") {
    return "server-render";
  }

  const existingId = window.localStorage.getItem(ANON_ID_STORAGE_KEY);
  if (existingId) {
    return existingId;
  }

  const newId = createAnonymousId();
  window.localStorage.setItem(ANON_ID_STORAGE_KEY, newId);
  return newId;
};

export const trackConversion = async (
  email: string,
  leadName: string,
  eventName: "contact_form" | string
) => {
  try {
    await fetch("/api/lead-capture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        lead_name: leadName,
        event_name: eventName,
        anonymousId: getAnonymousId(),
        source: "personal-portfolio",
      }),
    });
  } catch {
    // no-op to avoid blocking form submission on analytics failures
  }
};
