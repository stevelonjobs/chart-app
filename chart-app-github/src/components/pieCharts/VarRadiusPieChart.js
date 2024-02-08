import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

const VarRadiusPieChart = ({ data }) => {
  useEffect(() => {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    // console.log(data)
    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: true,
        calculateAggregates: true,
        valueField: "sales",
        categoryField: "menuItem",
      })
    )

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: am5.color(0xffffff),
    })

    series.labelsContainer.set("paddingTop", 30)

    // Set up adapters for variable slice radius
    // https://www.amcharts.com/docs/v5/concepts/settings/adapters/
    series.slices.template.adapters.add("radius", function (radius, target) {
      let dataItem = target.dataItem
      let high = series.getPrivate("valueHigh")

      if (dataItem) {
        let value = target.dataItem.get("valueWorking", 0)
        return (radius * value) / high
      }
      return radius
    })

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data)

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

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100)

    return () => root.dispose()
  })
  return (
    <div id='chartdiv' className="'w-full h-96 m-12 text-center'">
      Var Radius Pie Chart
    </div>
  )
}

export default VarRadiusPieChart
