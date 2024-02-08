import React from "react"
import HorizontalFunnel from "../../../components/funnelCharts/FunnelChart"
import funnelChartData from "../../../data/funnelChartData"

const FunnelChartParent = () => {
  return (
    <HorizontalFunnel
      data={funnelChartData}
      valueName='value'
      categoryName='category'
      orientation='horizontal'
      chartName='Funnel Chart'
    />
  )
}

export default FunnelChartParent
