import React from "react"
import RotatedLabelChart from "../../../components/columnCharts/RotatedLabelChart"
import rotatedLabelChartData from "../../../data/rotatedLabelChartData"

const RotatedLabelChartParent = () => {
  return (
    <RotatedLabelChart
      data={rotatedLabelChartData}
      xAxisCategory='state'
      yAxisValue='value'
    />
  )
}

export default RotatedLabelChartParent
