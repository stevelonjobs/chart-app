import React from "react"
import DraggingPieSlices from "../../../components/pieCharts/DraggingPieSlices"
import cropProtectionsSalesDataPieChart from "../../../data/cropProtectionSalesDataPieChart"

const DraggingPieSlicesParent = () => {
  return <DraggingPieSlices data={cropProtectionsSalesDataPieChart} />
}

export default DraggingPieSlicesParent
