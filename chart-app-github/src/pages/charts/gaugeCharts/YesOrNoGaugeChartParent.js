import React from "react"
import YesOrNoGaugeChart from "../../../components/gaugeCharts/YesOrNoGaugeChart"

const YesOrNoGaugeChartParent = () => {
  return (
    <YesOrNoGaugeChart
      greenAreaName='Above'
      redAreaName='Below'
      thresholdVal={6000}
      actualVal={6100}
      chartName='Yes or No Gauge Chart'
      styling='w-75 h-96 m-12 text-center'
    />
  )
}

export default YesOrNoGaugeChartParent
