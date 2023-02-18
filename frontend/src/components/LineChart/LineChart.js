import React, { useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function LineChart({ chartData }) {

  // console.log("chartData", chartData)

  return (
    <Line datasetIdKey='id' data={chartData} />
  )
}

export default LineChart;
