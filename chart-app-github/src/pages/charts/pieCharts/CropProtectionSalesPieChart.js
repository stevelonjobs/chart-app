import React, { useEffect, useState } from "react"

import PieChartComponent from "../../../components/pieCharts/PieChartComponent"
import cropProtectionsSalesDataPieChart from "../../../data/cropProtectionSalesDataPieChart"

const CropProtectionSalesPieChart = () => {
  const [fetchedData, setFetchedData] = useState([])
  const fetchData = async () => {
    try {
      const res = await fetch("/api")
      const data = await res.json()
      setFetchedData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <PieChartComponent
      data={cropProtectionsSalesDataPieChart}
      chartCategoryField='item'
      chartValueField='sales'
      styling='w-full h-96 m-12 text-center'
      chartName='Crop Protection Sales 2023'
    />
  )
}

export default CropProtectionSalesPieChart
