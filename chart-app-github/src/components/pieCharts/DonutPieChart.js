import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
const DonutPieChart = ({ data }) => {
  useEffect(() => {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "sales",
        categoryField: "item",
        alignLabels: false,
      })
    )

    series.labels.template.setAll({
      //   textType: "circular",
      centerX: 0,
      centerY: 0,
    })

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data)

    // // Create legend
    // // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    // let legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerX: am5.percent(50),
    //     x: am5.percent(50),
    //     marginTop: 15,
    //     marginBottom: 15,
    //   })
    // )

    // legend.data.setAll(series.dataItems)

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100)

    return () => root.dispose()
  }, [])
  return (
    <div id='chartdiv' className='w-75 h-96 m-12 text-center'>
      Crop Protection Sales 2023
    </div>
  )
}

export default DonutPieChart
