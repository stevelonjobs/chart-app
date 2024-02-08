import React from "react"
import MinimalMultipleLineChart from "../../../components/lineCharts/MinimalMultipleLineChart"
import { minimalMultipleLineChartData } from "../../../data/minimalMultipleLineChartData"

const MinimalMultipleLineChartParent = () => {
  const lineNames = ["Pesticides", "Insecticides", "Fungicides"]

  return (
    <MinimalMultipleLineChart
      data={minimalMultipleLineChartData}
      styling='w-75 h-96 m-12 text-center'
      chartName='Order For Different Products On Different Days'
      numOfLines={minimalMultipleLineChartData.length}
      lineNames={lineNames}
      hasScrollBarX={true}
      hasScrollBarY={true}
      xAxisDataName='date'
      yAxisDataName='value'
    />
  )
}

export default MinimalMultipleLineChartParent
