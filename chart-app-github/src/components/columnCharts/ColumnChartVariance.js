import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
const ColumnChartVariance = ({ data }) => {
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
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        paddingLeft: 0,
      })
    )

    // Populate data
    for (var i = 0; i < data.length - 1; i++) {
      data[i].valueNext = data[i + 1].value
    }

    console.log(data)

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minGridDistance: 30,
      minorGridEnabled: true,
    })

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    xRenderer.grid.template.setAll({
      location: 1,
    })

    xAxis.data.setAll(data)

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    )

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    // Column series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "year",
      })
    )

    series.columns.template.setAll({
      tooltipText: "{categoryX}: {valueY}",
      width: am5.percent(90),
      tooltipY: 0,
    })

    series.data.setAll(data)

    // Variance indicator series
    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "valueNext",
        openValueYField: "value",
        categoryXField: "year",
        fill: am5.color(0x555555),
        stroke: am5.color(0x555555),
      })
    )

    series2.columns.template.setAll({
      width: 1,
    })

    series2.data.setAll(data)

    series2.bullets.push(function () {
      let label = am5.Label.new(root, {
        text: "{valueY}",
        fontWeight: "500",
        fill: am5.color(0x00cc00),
        centerY: am5.p100,
        centerX: am5.p50,
        populateText: true,
      })

      // Modify text of the bullet with percent
      label.adapters.add("text", function (text, target) {
        let percent = getVariancePercent(target.dataItem)
        return percent ? percent + "%" : text
      })

      // Set dynamic color of the bullet
      label.adapters.add("centerY", function (center, target) {
        return getVariancePercent(target.dataItem) < 0 ? 0 : center
      })

      // Set dynamic color of the bullet
      label.adapters.add("fill", function (fill, target) {
        return getVariancePercent(target.dataItem) < 0
          ? am5.color(0xcc0000)
          : fill
      })

      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: label,
      })
    })

    series2.bullets.push(function () {
      let arrow = am5.Graphics.new(root, {
        rotation: -90,
        centerX: am5.p50,
        centerY: am5.p50,
        dy: 3,
        fill: am5.color(0x555555),
        stroke: am5.color(0x555555),
        draw: function (display) {
          display.moveTo(0, -3)
          display.lineTo(8, 0)
          display.lineTo(0, 3)
          display.lineTo(0, -3)
        },
      })

      arrow.adapters.add("rotation", function (rotation, target) {
        return getVariancePercent(target.dataItem) < 0 ? 90 : rotation
      })

      arrow.adapters.add("dy", function (dy, target) {
        return getVariancePercent(target.dataItem) < 0 ? -3 : dy
      })

      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: arrow,
      })
    })

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear()
    chart.appear(1000, 100)

    function getVariancePercent(dataItem) {
      if (dataItem) {
        let value = dataItem.get("valueY")
        let openValue = dataItem.get("openValueY")
        let change = value - openValue
        return Math.round((change / openValue) * 100)
      }
      return 0
    }

    return () => root.dispose()
  })
  return (
    <div id='chartdiv' className='w-75 h-96 m-12 text-center'>
      Column Chart Variance
    </div>
  )
}

export default ColumnChartVariance
