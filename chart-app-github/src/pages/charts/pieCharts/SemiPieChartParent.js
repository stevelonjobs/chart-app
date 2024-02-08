import React from "react"
import SemiPieChart from "../../../components/pieCharts/SemiPieChart"
import cropProtectionsSalesDataPieChart from "../../../data/cropProtectionSalesDataPieChart"

const SemiPieChartParent = () => {
  return <SemiPieChart data={cropProtectionsSalesDataPieChart} />
}

export default SemiPieChartParent
