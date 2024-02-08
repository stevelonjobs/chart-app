import React from "react"
import RangeSliderLineChart from "../../../components/lineCharts/RangeSliderLineChart"
import { lineChartWithTargetData } from "../../../data/lineChartWithTargetData"

const RangeSliderParent = () => {
  return <RangeSliderLineChart data={lineChartWithTargetData} />
}

export default RangeSliderParent
