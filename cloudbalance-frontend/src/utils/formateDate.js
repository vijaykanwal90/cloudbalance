
const formatDateTime = (isoString) => {
    if(isoString ===null){
        return '--';
    }
  const date = new Date(isoString);

  const datePart = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const timePart = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return `${datePart}, ${timePart}`;
};

export { formatDateTime}