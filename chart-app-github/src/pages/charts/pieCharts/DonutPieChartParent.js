import React from "react"
import DonutPieChart from "../../../components/pieCharts/DonutPieChart"
import cropProtectionsSalesDataPieChart from "../../../data/cropProtectionSalesDataPieChart"

const DonutPieChartParent = () => {
  return <DonutPieChart data={cropProtectionsSalesDataPieChart} />
}

export default DonutPieChartParent
