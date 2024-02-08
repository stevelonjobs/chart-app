import React from "react"
import VarRadiusPieChart from "../../../components/pieCharts/VarRadiusPieChart"
import cropProtectionsSalesDataPieChart from "../../../data/cropProtectionSalesDataPieChart"

const VarRadiusPieChartParent = () => {
  return <VarRadiusPieChart data={cropProtectionsSalesDataPieChart} />
}

export default VarRadiusPieChartParent
