import React from "react"
import ColumnChartGrainyGradient from "../../../components/columnCharts/ColumnChartGrainyGradient"
import rotatedLabelChartData from "../../../data/rotatedLabelChartData"

const ColumnChartGrainyGradientParent = () => {
  return (
    <ColumnChartGrainyGradient
      data={rotatedLabelChartData}
      xAxisValue='state'
      yAxisValue='value'
    />
  )
}
export default ColumnChartGrainyGradientParent
