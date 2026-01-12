export const formatCostData = (rawData) => {
 
    const months = rawData.data.map(item => item.month);

   const filters = [
    ...new Set(
      rawData.data.flatMap(item => Object.keys(item.filters))
    )
  ];
 
  const dataset = filters.map(filter => ({
  seriesname: filter,
  data: months.map(month => {
    const monthObj = rawData.data.find(d => d.month === month);
    return {
      value: monthObj?.filters?.[filter] ?? 0
    };
  })
}));

  
const categories = [
  {
    category: months.map(month => {
      

      return {
        label: month
      };
    })
  }
];

  return {
    chart: {
    
      xAxisName: "Months",
      yAxisName: "Cost ($)",
      theme: "fusion",
      formatNumberScale: "0"
    },
    categories,
    dataset
  };
};