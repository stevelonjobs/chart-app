import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

const RadialGradentPieChart = ({ data }) => {
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
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
        layout: root.horizontalLayout,
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "menuItem",
      })
    )

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data)

    // Disabling labels and ticks
    series.labels.template.set("visible", false)
    series.ticks.template.set("visible", false)

    // Adding gradients
    series.slices.template.set("strokeOpacity", 0)
    series.slices.template.set(
      "fillGradient",
      am5.RadialGradient.new(root, {
        stops: [
          {
            brighten: -0.8,
          },
          {
            brighten: -0.8,
          },
          {
            brighten: -0.5,
          },
          {
            brighten: 0,
          },
          {
            brighten: -0.5,
          },
        ],
      })
    )

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
      })
    )
    // set value labels align to right
    legend.valueLabels.template.setAll({ textAlign: "right" })
    // set width and max width of labels
    legend.labels.template.setAll({
      maxWidth: 140,
      width: 140,
      oversizedBehavior: "wrap",
    })

    legend.data.setAll(series.dataItems)

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100)

    return () => root.dispose()
  }, [])
  return (
    <div id='chartdiv' className='w-75 h-96 m-12 text-center'>
      Radial Gradient
    </div>
  )
}

export default RadialGradentPieChart
