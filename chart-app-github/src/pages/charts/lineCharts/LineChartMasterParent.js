import React from "react"
import { lineChartWithTargetData } from "../../../data/lineChartWithTargetData"
import LineChartMaster from "../../../components/lineCharts/LineChartMaster"
import { multipleLineChartData } from "../../../data/multipleLineChartData"
import { minimalMultipleLineChartData } from "../../../data/minimalMultipleLineChartData"
import minorGridLinesData from "../../../data/minorGridLinesData"
const LineChartParent = () => {
  // console.log("lineChartWithTargetData: ", lineChartWithTargetData)
  // console.log("multipleLineChartData: ", multipleLineChartData)
  // console.log(multipleLineChartData[0])
  // console.log("minimalMultipleLineChartData: ", minimalMultipleLineChartData)
  // console.log("minorGridLinesData: ", minorGridLinesData)
  return (
    <LineChartMaster
      data={minimalMultipleLineChartData}
      styling='w-75 h-96 m-12 text-center'
      chartName='Line Chart'
      // hasScrollBarX={true}
      // hasScrollBarY={false}
      isMultiLine={true}
      hasTarget={false}
      // targetValue={800}
      // targetName={"Target Orders"}
      hasDraggableTarget={false}
      hasRangeSlider={false}
      hasMinorGridLines={false}
    />
  )
}

export default LineChartParent
