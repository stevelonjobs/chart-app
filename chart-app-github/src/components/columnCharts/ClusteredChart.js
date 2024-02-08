import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"

const ClusteredChart = ({ data, styling, chartName, chartCategoryField }) => {
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
        panX: false,
        panY: false,
        paddingLeft: 0,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
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

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minorGridEnabled: true,
    })

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: chartCategoryField, //props
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    xRenderer.grid.template.setAll({
      location: 1,
    })

    xAxis.data.setAll(data) //props

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    )

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(fieldName) {
      //props
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: fieldName,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: chartCategoryField, //props
        })
      )

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX} : {valueY}",
        width: am5.percent(90),
        tooltipY: 0,
        strokeOpacity: 0,
      })

      series.data.setAll(data)

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear()

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternateText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        })
      })

      legend.data.push(series)
    }

    for (let key in data[0]) {
      //my implentation to dynamically make series, also modified makeSeries for dynamism
      if (key === chartCategoryField) continue
      makeSeries(key)
    }

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [])

  return (
    <div id='chartdiv' className={styling}>
      {chartName}
    </div>
  )
}

export default ClusteredChart
