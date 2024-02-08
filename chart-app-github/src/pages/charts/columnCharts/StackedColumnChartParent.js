import React from "react"
import StackedColumnChart from "../../../components/columnCharts/StackedColumnChart"
import clusteredChartData from "../../../data/clusteredChartData"

const StackedColumnChartParent = () => {
  return <StackedColumnChart data={clusteredChartData} stackCategory='year' />
}

export default StackedColumnChartParent
