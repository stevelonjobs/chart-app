import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive"
const ColumnChartGrainyGradient = ({ data, xAxisValue, yAxisValue }) => {
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
        layout: root.verticalLayout,
      })
    )

    chart.set(
      "colors",
      am5.ColorSet.new(root, {
        colors: [
          am5.color(0x73556e),
          am5.color(0x9fa1a6),
          am5.color(0xf2aa6b),
          am5.color(0xf28f6b),
          am5.color(0xa95a52),
          am5.color(0xe35b5d),
          am5.color(0xffa446),
        ],
      })
    )

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 50,
      minorGridEnabled: true,
    })

    xRenderer.grid.template.setAll({
      location: 1,
    })

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: xAxisValue, //props
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
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
        valueYField: yAxisValue, //props
        categoryXField: xAxisValue, //props
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    )

    series.columns.template.setAll({
      tooltipY: 0,
      tooltipText: "{categoryX}: {valueY}",
      shadowOpacity: 0.1,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 1,
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
      shadowColor: am5.color(0x000000),
      cornerRadiusTL: 50,
      cornerRadiusTR: 50,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          {}, // will use original column color
          { color: am5.color(0x000000) },
        ],
      }),
      fillPattern: am5.GrainPattern.new(root, {
        maxOpacity: 0.15,
        density: 0.5,
        colors: [am5.color(0x000000), am5.color(0x000000), am5.color(0xffffff)],
      }),
    })

    series.columns.template.states.create("hover", {
      shadowOpacity: 1,
      shadowBlur: 10,
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
    })

    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target))
    })

    // Set data
    xAxis.data.setAll(data) //props
    series.data.setAll(data) //props

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000)
    chart.appear(1000, 100)

    return () => root.dispose()
  }, [])
  return (
    <div id='chartdiv' className='w-75 h-96 m-12 text-center'>
      Column Chart Grainy Gradient
    </div>
  )
}

export default ColumnChartGrainyGradient
