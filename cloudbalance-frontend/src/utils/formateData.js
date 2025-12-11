export const formatCostData = (rawData) => {
  // Extract months (keys except Usage Type + Total)
  const months = Object.keys(rawData[0]).filter(
    (key) => key !== "Usage Type" && key !== "Total"
  );

  // Create category labels
  const categories = [
    {
      category: months.map((m) => ({ label: m }))
    }
  ];

  // Create dataset
  const dataset = rawData.map((item) => ({
    seriesname: item["Usage Type"],
    data: months.map((m) => ({ value: item[m] }))
  }));

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