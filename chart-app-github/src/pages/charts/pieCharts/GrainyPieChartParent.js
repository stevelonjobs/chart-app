import React from "react"
import GrainyPieChart from "../../../components/pieCharts/GrainyPieChart"
import grainyPieChartData from "../../../data/grainyPieChartData"

const GrainyPieChartParent = () => {
  return (
    <GrainyPieChart
      data={grainyPieChartData}
      chartName='2023 State Wise Sales'
      categoryName='category'
      valueName='value'
      styling='w-full h-96 m-12 text-center'
    />
  )
}

export default GrainyPieChartParent
