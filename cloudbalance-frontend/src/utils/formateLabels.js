export const formatKeyToLabel = (key) => {
  if (!key) return "";

  // Replace underscores with spaces
  const withSpaces = key.replace(/_/g, " ");

  // Capitalize first letter of each word
  const label = withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());

  return label;
};