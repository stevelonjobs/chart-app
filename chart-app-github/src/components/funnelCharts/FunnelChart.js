import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
const HorizontalFunnel = ({
  data,
  valueName,
  categoryName,
  orientation,
  chartName,
}) => {
  useEffect(() => {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
    let chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
    let series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        alignLabels: false,
        orientation: orientation,
        valueField: valueName,
        categoryField: categoryName,
        bottomRatio: 1,
      })
    )

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
    series.data.setAll(data)

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear()

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15,
      })
    )

    legend.data.setAll(series.dataItems)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    return () => root.dispose()
  })
  return (
    <div id='chartdiv' className='w-75 h-96 m-12 text-center'>
      {chartName}
    </div>
  )
}

export default HorizontalFunnel
