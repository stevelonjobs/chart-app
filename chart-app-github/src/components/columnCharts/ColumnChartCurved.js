import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"

const ColumnChartCurved = ({ data }) => {
  useEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 5,
        paddingRight: 5,
      })
    )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}))
    cursor.lineY.set("visible", false)

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 60,
      minorGridEnabled: true,
    })

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "state", //props
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    xRenderer.grid.template.setAll({
      location: 1,
    })

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value", //props
        sequencedInterpolation: true,
        categoryXField: "state", //props
      })
    )

    series.columns.template.setAll({
      width: am5.percent(120),
      fillOpacity: 0.9,
      strokeOpacity: 0,
    })
    series.columns.template.adapters.add("fill", (fill, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target))
    })

    series.columns.template.adapters.add("stroke", (stroke, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target))
    })

    series.columns.template.set("draw", function (display, target) {
      let w = target.getPrivate("width", 0)
      let h = target.getPrivate("height", 0)
      display.moveTo(0, h)
      display.bezierCurveTo(w / 4, h, w / 4, 0, w / 2, 0)
      display.bezierCurveTo(w - w / 4, 0, w - w / 4, h, w, h)
    })

    // Set data

    xAxis.data.setAll(data)
    series.data.setAll(data)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000)
    chart.appear(1000, 100)

    return () => root.dispose()
  })
  return (
    <div id='chartdiv' className='w-75 h-96 m-12 text-center'>
      Column Chart Curved
    </div>
  )
}

export default ColumnChartCurved
