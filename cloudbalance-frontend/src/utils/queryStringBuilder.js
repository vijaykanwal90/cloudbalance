export const buildQueryString = (queryObj) => {
   
  const params = new URLSearchParams();
  for (const key in queryObj) {
    const value = queryObj[key];

    if (value != null && value !== "") {
      if (Array.isArray(value)) {
       
        value.forEach((item) => {
          params.append(key, item);
        });
      } else {
        params.append(key, value);
      }
    }
  }

  return params.toString();
};
