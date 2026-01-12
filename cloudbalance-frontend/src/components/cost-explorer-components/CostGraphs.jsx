import React, { useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { formatCostData } from "../../utils/formateData";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from '@mui/icons-material/Timeline';
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
Charts(FusionCharts);
FusionTheme(FusionCharts);

const graphTypes = ["bar-graph", "line-chart", "stacked-chart"];
const CostGraphs = ({costData}) => {
  // console.log(costData)
  const formattedData = formatCostData(costData);
  const [graphType, setGraphType] = useState("bar-graph");

  const changeGraphType = (type) => {
    setGraphType(type);
  };
  return (
    <div className=" my-2  py-2">
      <div className=" flex justify-between ">
        <p>Costs</p>
        <div className="flex gap-4">
          <div className="border px-2 flex gap-2 text-blue-900 font-bold bg-white ">
            <button className="cursor-pointer">Start</button>

            <button className="cursor-pointer">End</button>
          </div>
          <div className="border rounded-sm bg-white cursor-pointer text-gray-600 flex gap-1">
            <BarChartIcon
              onClick={() => {
                changeGraphType("bar-graph");
              }}
            />
            <span className="border-r"></span>
            <TimelineIcon
              onClick={() => {
                changeGraphType("line-chart");
              }}
            />
           
            <span className="border-r"></span>

            <StackedBarChartIcon
              onClick={() => {
                changeGraphType("stacked-chart");
              }}
            />
          </div>
        </div>
      </div>
      <div className=" border py-2 my-2 px-4 ">
        {graphType === "bar-graph" && (
          <ReactFusioncharts
            type="mscolumn2d"
            width="100%"
            height="60%"
            dataFormat="JSON"
            dataSource={formattedData}
          />
        )}
        {graphType === "line-chart" && (
          <ReactFusioncharts
            type="msline"
            width="100%"
            height="60%"
            dataFormat="JSON"
            dataSource={formattedData}
          />
        )}
        {graphType === "stacked-chart" && (
          <ReactFusioncharts
            type="stackedcolumn2d"
            width="100%"
            height="60%"
            dataFormat="JSON"
            dataSource={formattedData}
          />
        )}
      </div>
    </div>
  );
};

export default CostGraphs;
