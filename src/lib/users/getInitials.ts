export const getUserInitials = (
  name?: string | null,
  email?: string | null
): string => {
  const fallback = "TC";
  const normalize = (input?: string | null) => input?.trim() ?? "";

  let initials = "";
  const sanitizedName = normalize(name);

  if (sanitizedName) {
    const parts = sanitizedName.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      initials = `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`;
    } else if (parts.length === 1) {
      initials = parts[0].slice(0, 2);
    }
  }

  if (!initials) {
    const sanitizedEmail = normalize(email);
    if (sanitizedEmail.includes("@")) {
      const localPart = sanitizedEmail.split("@")[0] ?? "";
      initials = localPart.slice(0, 2);
    } else if (sanitizedEmail) {
      initials = sanitizedEmail.slice(0, 2);
    }
  }

  const upper = initials.toUpperCase();
  return upper || fallback;
};

