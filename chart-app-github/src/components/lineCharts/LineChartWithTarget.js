// Line Chart with Horizontal Target
import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"

const LineChartWithTarget = ({
  data,
  styling,
  chartName,
  targetValue,
  targetName,
  hasScrollBarX,
  hasScrollBarY,
}) => {
  useEffect(() => {
    // Create a root element for the AmCharts library, associated with the HTML element with the ID "chartdiv"
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    // Create an XYChart instance, associated with the previously created root element
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true, // Enable panning along the X-axis
        panY: true, // Enable panning along the Y-axis
        wheelX: "panX", // Enable horizontal zooming with the mouse wheel
        wheelY: "zoomX", // Enable vertical zooming with the mouse wheel
        pinchZoomX: true, // Enable pinch-to-zoom on touch devices along the X-axis
        paddingLeft: 0, // Set the left padding of the chart to 0
      })
    )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {})) // Create an XYCursor instance and assign it to the 'cursor' property of the chart

    cursor.lineX.set("forceHidden", true) // Hide the vertical cursor line

    cursor.lineY.set("forceHidden", true) // Hide the horizontal cursor line

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    // Create a new DateAxis and push it to the xAxes array of the chart
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        // Configure the base interval for the axis (time unit: day, count: 1)
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        // Use a custom renderer for the X-axis with minor grid lines enabled and a specified min grid distance
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 80,
        }),
        tooltip: am5.Tooltip.new(root, {}), // Enable tooltips for the X-axis
      })
    )

    // Create Y-axis
    // Create a new ValueAxis and push it to the yAxes array of the chart
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        // Use the default renderer for the Y-axis
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    // Create a LineSeries and push it to the series array of the chart
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series", // Name of the series (for reference or legend)
        xAxis: xAxis, // Associate the series with the X-axis
        yAxis: yAxis, // Associate the series with the Y-axis
        valueYField: "value", // Use the "value" field for the Y-axis values
        valueXField: "date", // Use the "date" field for the X-axis values
        tooltip: am5.Tooltip.new(root, {
          // pointerOrientation: "horizontal",
          labelText: "{valueY}", // Configure the tooltip to show the Y-axis value
        }),
      })
    )

    // Set visual properties for the fills of the series
    series.fills.template.setAll({
      fillOpacity: 0.2, // Set the opacity of the fill to 0.2
      visible: true, // Make the fill visible
    })

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // Create a horizontal scrollbar and set it for the X-axis of the chart
    if (hasScrollBarX) {
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal", // Set the orientation of the scrollbar to horizontal
        })
      )
    }

    // Add vertical scrollbar to the chart for Y-axis
    if (hasScrollBarY) {
      chart.set(
        "scrollbarY",
        am5.Scrollbar.new(root, {
          orientation: "vertical",
        })
      )
    }

    // Set data for the series
    series.data.setAll(data)

    // // Create a new Date object
    // let rangeDate = new Date()

    // // Add days to the date based on half the length of the dataItems in the series
    // am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2))

    // // Get the time value of the modified date
    // let rangeTime = rangeDate.getTime()

    // Create a new data item for the series range with specified values
    let seriesRangeDataItem = yAxis.makeDataItem({
      value: targetValue, //targetValue(props) is being set here
      endValue: 0,
    })

    // Create a new range on the series and associate it with the data item
    let seriesRange = series.createAxisRange(seriesRangeDataItem)

    // Configure visual properties for the fills of the series range
    seriesRange.fills.template.setAll({
      visible: true, // Make the fill visible
      opacity: 0.3, // Set the opacity of the fill to 0.3
    })

    // Set a specific fill color for the series range
    seriesRange.fills.template.set("fill", am5.color(0x000000))

    // Set a specific stroke color for the series range
    seriesRange.strokes.template.set("stroke", am5.color(0x000000))

    // Configure the grid line properties for the series range
    seriesRangeDataItem.get("grid").setAll({
      strokeOpacity: 1, // Set the opacity of the grid line to 1 (fully opaque)
      visible: true, // Make the grid line visible
      stroke: am5.color(0x000000), // Set the color of the grid line to black
      strokeDasharray: [2, 2], // Set a dashed pattern for the grid line [dash length, gap length]
    })

    // Configure label properties for the series range
    seriesRangeDataItem.get("label").setAll({
      location: 0, // Set the location of the label (0 corresponds to the start of the range)
      visible: true, // Make the label visible
      text: targetName, // Set the text content of the label to "Target" PROPS-> targetName
      inside: true, // Position the label inside the series range
      centerX: 0, // Center the label horizontally within the series range
      centerY: am5.p100, // Align the label vertically to the top of the series range
      fontWeight: "bold", // Set the font weight of the label to bold
    })

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000)
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [data, hasScrollBarX, hasScrollBarY, targetName, targetValue])

  return (
    <div id='chartdiv' className={styling}>
      {chartName}
    </div>
  )
}

export default LineChartWithTarget
