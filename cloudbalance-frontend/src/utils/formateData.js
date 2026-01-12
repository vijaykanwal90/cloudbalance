export const formatCostData = (rawData) => {
 
    const months = rawData.data.map(item => item.month);

// console.log(months);
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
console.log(dataset)

  
const categories = [
  {
    category: months.map(month => {
      

      return {
        label: month
      };
    })
  }
];

console.log(categories);
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