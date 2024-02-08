import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive"
const StackedColumnChart = ({ data, stackCategory }) => {
  useEffect(() => {
    console.log(data[0])
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    )

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    )

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
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
        max: 100,
        numberFormat: "#'%'",
        strictMinMax: true,
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    )

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    )

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(fieldName) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: fieldName,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          valueYShow: "valueYTotalPercent",
          categoryXField: "year",
        })
      )

      series.columns.template.setAll({
        tooltipText:
          "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
        tooltipY: am5.percent(10),
      })
      series.data.setAll(data)

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear()

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: "{valueYTotalPercent.formatNumber('#.#')}%",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        })
      })

      legend.data.push(series)
    }

    // makeSeries("Andhra Pradesh")
    // makeSeries("Gujarat")
    // makeSeries("Karnataka")
    // makeSeries("Kerala")
    // makeSeries("Rajasthan")
    // makeSeries("Telangana")

    for (let key in data[0]) {
      //my implentation to dynamically make series, also modified makeSeries for dynamism
      if (key === stackCategory) continue
      makeSeries(key)
    }

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)
    return () => root.dispose()
  })
  return (
    <div id='chartdiv' className='w-75 h-96 m-12 text-center'>
      Stacked Column Chart
    </div>
  )
}

export default StackedColumnChart
