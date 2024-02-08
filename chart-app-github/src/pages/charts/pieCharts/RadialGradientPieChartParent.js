import React from "react"
import RadialGradentPieChart from "../../../components/pieCharts/RadialGradentPieChart"
import cropProtectionsSalesDataPieChart from "../../../data/cropProtectionSalesDataPieChart"

const RadialGradientPieChartParent = () => {
  return <RadialGradentPieChart data={cropProtectionsSalesDataPieChart} />
}

export default RadialGradientPieChartParent
