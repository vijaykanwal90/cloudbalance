export const fomateTableData = (rawData) => {
  const group = rawData.group;

  const months = rawData.data.map((item) => item.month);

  const headings = [
    {
      category: months.map((month) => {
        return {
          label: month,
        };
      }),
    },
  ];

  const filters = [
    ...new Set(rawData.data.flatMap((item) => Object.keys(item.filters))),
  ];
  const filterCost = filters.map(service => {
  const costs = months.map(month => {
    // Find the month data
    const monthData = rawData.data.find(d => d.month === month);
    // Get cost or 0 if not present
    return monthData.filters[service] || 0;
  })
return {
    service,
    costs
  };
});
console.log(filterCost)
  return {
    group,
    headings,
    filterCost
    
  };
};
