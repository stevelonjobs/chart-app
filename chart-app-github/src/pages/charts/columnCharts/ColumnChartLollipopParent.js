import React from "react"
import ColumnChartLollipop from "../../../components/columnCharts/ColumnChartLollipop"
import columnChartLollipopData from "../../../data/columnChartLollipopData"

const ColumnChartLollipopParent = () => {
  return (
    <ColumnChartLollipop
      data={columnChartLollipopData}
      hasScrollBarX={true}
      hasScrollBarY={true}
    />
  )
}

export default ColumnChartLollipopParent
