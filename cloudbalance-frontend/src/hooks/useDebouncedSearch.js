import { useEffect, useState } from "react";

export const useDebouncedSearch = ({
  query,
  data = [],
  keys = [],
  delay = 300,
}) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query) {
        setFilteredData(data);
        return;
      }

      const lowerQuery = query.toLowerCase();

      const result = data.filter((item) => {
        return keys.some((key) =>
          String(item[key] ?? "")
            .toLowerCase()
            .includes(lowerQuery)
        );
      });

      setFilteredData(result);
    }, delay);

    return () => clearTimeout(handler);
  }, [query, data, keys, delay]);

  return filteredData;
};
