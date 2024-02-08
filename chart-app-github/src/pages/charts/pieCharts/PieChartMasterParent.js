/* this can be configured in the following manner: 
 data, styling, chartName : mandatory props (necessarily needs to be passed into all the graphs)
isDonut, isGrainy, hasVarRadius, hasDraggableSlices, isSemiPie, isRadialGradient : set any one of these properties to true to get that particular pie chart
for simple pie chart, pass mandatory props and keep (isDonut, isGrainy, hasVarRadius, hasDraggableSlices, isSemiPie, isRadialGradient) as false.
*/
import React from "react"
import PieChartMaster from "../../../components/pieCharts/PieChartMaster"
import cropProtectionsSalesDataPieChart from "../../../data/cropProtectionSalesDataPieChart"
import grainyPieChartData from "../../../data/grainyPieChartData"
const PieChartMasterParent = () => {
  // console.log(JSON.parse(JSON.stringify(cropProtectionsSalesDataPieChart)))
  return (
    <PieChartMaster
      data={cropProtectionsSalesDataPieChart}
      styling='w-75 h-96 m-12 text-center'
      chartName='Crop Protection Sales 2023'
      isDonut={true}
      isGrainy={false}
      hasVarRadius={false}
      hasDraggableSlices={false}
      isSemiPie={false}
      isRadialGradient={false}
    />
  )
}

export default PieChartMasterParent
