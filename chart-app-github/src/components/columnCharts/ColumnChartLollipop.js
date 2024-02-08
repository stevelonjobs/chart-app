import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive"
const ColumnChartLollipop = ({
  data,
  hasScrollBarX,
  hasScrollBarY,
  xAxisValue,
  yAxisValue,
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
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}))
    cursor.lineY.set("visible", false)

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 15,
      minorGridEnabled: true,
    })

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: 0,
    })

    xRenderer.grid.template.setAll({
      visible: false,
    })

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        adjustBulletPosition: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    )
    series.columns.template.setAll({
      width: 0.5,
    })

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill"),
        }),
      })
    })

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    if (hasScrollBarX) {
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
        })
      )
    }

    if (hasScrollBarY) {
      chart.set(
        "scrollbarY",
        am5.Scrollbar.new(root, {
          orientation: "vertical",
        })
      )
    }

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
      Column Chart Lollipop
    </div>
  )
}

export default ColumnChartLollipop
