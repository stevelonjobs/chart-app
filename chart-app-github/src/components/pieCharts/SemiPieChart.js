import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

const SemiPieChart = ({ data }) => {
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
    // start and end angle must be set both for chart and series
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    // start and end angle must be set both for chart and series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: "sales",
        categoryField: "menuItem",
        alignLabels: false,
      })
    )

    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180,
    })

    series.slices.template.setAll({
      cornerRadius: 5,
    })

    series.ticks.template.setAll({
      forceHidden: true,
    })

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data)

    series.appear(1000, 100)

    return () => root.dispose()
  })
  return (
    <div id='chartdiv' className='w-75 h-96 m-12 text-center'>
      SemiPieChartParent
    </div>
  )
}

export default SemiPieChart
