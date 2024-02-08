import React from "react"
import ColumnChartCurved from "../../../components/columnCharts/ColumnChartCurved"
import rotatedLabelChartData from "../../../data/rotatedLabelChartData"

const ColumnChartCurvedParent = () => {
  return <ColumnChartCurved data={rotatedLabelChartData} />
}

export default ColumnChartCurvedParent
