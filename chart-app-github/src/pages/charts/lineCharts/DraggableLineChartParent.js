import React from "react"
import DraggableLineChart from "../../../components/lineCharts/DraggableLineChart"
import { lineChartWithTargetData } from "../../../data/lineChartWithTargetData"

const DraggableLineChartParent = () => {
  return (
    <DraggableLineChart
      styling='w-75 h-96 m-12 text-center'
      chartName='Draggable Line Chart'
      data={lineChartWithTargetData}
    />
  )
}

export default DraggableLineChartParent
