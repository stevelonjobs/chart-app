/* 
this implements the following charts:
Date Column Chart, Clustered, Stacked, Grainy Gradient, Curved Columns, Lollipop Chart, Variance Chart
configured in the following manner:
(data, chartName, styling) : mandatory props, needs to be passed into all the charts
(hasScrollBarX, hasScrollBarY) : optional props, can be set to true to have x and y axis scroll bars.
1. Date Column Chart:
  - pass mandatory props. with keeping isDateColumnChart as true. All other props as false.
2. Cluster Chart:
  - pass mandatory props. with keeping isClustered as true. All other props as false.
3. Stacked Chart:
  - pass mandatory props. with keeping isStacked as true. All other props as false.
4. Grainy Gradient
  - pass mandatory props. with keeping hasGrainyGradient as true. All other props as false.  
5. Curved Columns
  - pass mandatory props. with keeping hasCurvedColumns as true. All other props as false.  
6. Lollipop Chart 
  - pass mandatory props. with keeping isLollipopChart as true. All other props as false.  
7. Variance Chart
  - pass mandatory props. with keeping isClustered as true. All other props as false.
*/

import React from "react"
import ColumnChartMaster from "../../../components/columnCharts/ColumnChartMaster"
import rotatedLabelChartData from "../../../data/rotatedLabelChartData"
import clusteredChartData from "../../../data/clusteredChartData"
import simpleColumnChartData from "../../../data/simpleColumnChartData"
import columnChartLollipopData from "../../../data/columnChartLollipopData"
import columnChartVarianceData from "../../../data/columnChartVarianceData"

const ColumnChartMasterParent = () => {
  return (
    <ColumnChartMaster
      data={columnChartVarianceData}
      chartName='2023 State Wise Sales'
      styling='w-75 h-96 m-12 text-center'
      hasScrollBarX={false}
      hasScrollBarY={false}
      isDateColumnChart={false}
      isClustered={false}
      // clusterCategory='year'
      hasRotatedLabels={false}
      isStacked={false}
      // stackCategory='year'
      hasGrainyGradient={false}
      hasCurvedColumns={false}
      isLollipopChart={false}
      isVarianceChart={false}
      isXAxisValueNumber={false}
      // xAxisValueName='year'
    />
  )
}

export default ColumnChartMasterParent
