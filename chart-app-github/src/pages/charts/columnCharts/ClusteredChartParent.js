import React from "react"
import ClusteredChart from "../../../components/columnCharts/ClusteredChart"
import clusteredChartData from "../../../data/clusteredChartData"

const ClusteredChartParent = () => {
  return (
    <ClusteredChart
      data={clusteredChartData}
      chartName='State Wise Sales Over The Last Three Years'
      styling='w-75 h-96 m-12 text-center'
      chartCategoryField='year'
    />
  )
}

export default ClusteredChartParent
