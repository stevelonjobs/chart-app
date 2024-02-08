import React from "react"
import { multipleLineChartData } from "../../../data/multipleLineChartData"
import MultipleLineChart from "../../../components/lineCharts/MultipleLineChart"

const MultipleLineChartParent = () => {
  console.log(JSON.stringify(multipleLineChartData))
  return (
    <MultipleLineChart
      data={multipleLineChartData}
      styling='w-75 h-96 m-12 text-center'
      chartName='Multiple Line Chart'
      numOfLines={multipleLineChartData.length}
    />
  )
}

export default MultipleLineChartParent
