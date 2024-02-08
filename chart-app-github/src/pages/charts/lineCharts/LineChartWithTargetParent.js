import React, { useEffect, useState } from "react"
import LineChartWithTarget from "../../../components/lineCharts/LineChartWithTarget"
import { lineChartWithTargetData } from "../../../data/lineChartWithTargetData"

const LineChartWithTargetParent = () => {
  const [fetchedData, setFetchedData] = useState([])
  // console.log(JSON.stringify(lineChartWithTargetData))
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch("/api")
      const data = await res.json()
      setFetchedData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <LineChartWithTarget
      data={fetchedData}
      styling='w-75 h-96 m-12 text-center'
      chartName='Target Orders Vs Actual Orders Per Day'
      targetValue={800}
      targetName='Target Orders'
      hasScrollBarX={true}
      hasScrollBarY={false}
    />
  )
}

export default LineChartWithTargetParent
