import React, { useState, useEffect } from "react"
import MinorGridLines from "../../../components/lineCharts/MinorGridLines"
import minorGridLinesData from "../../../data/minorGridLinesData"

const MinorGridLinesParent = () => {
  console.log("parent json", JSON.stringify(minorGridLinesData))
  const [fetchedData, setFetchedData] = useState([])

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

  return <MinorGridLines data={fetchedData} />
}

export default MinorGridLinesParent
