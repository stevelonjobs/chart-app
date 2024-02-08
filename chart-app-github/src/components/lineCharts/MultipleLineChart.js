import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"

const MultipleLineChart = ({ data, styling, chartName, numOfLines }) => {
  useEffect(() => {
    // Create a root element associated with the HTML element having the ID "chartdiv"
    let root = am5.Root.new("chartdiv")

    // Create a custom theme named "myTheme" using the root element
    const myTheme = am5.Theme.new(root)

    // Apply styling rules to AxisLabel elements with the "minor" role in the theme
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1, // Adjust the vertical position of minor axis labels
    })

    // Apply styling rules to Grid elements on the X-axis in the theme
    myTheme.rule("Grid", ["x"]).setAll({
      strokeOpacity: 0.05, // Set the stroke opacity for major grid lines on the X-axis
    })

    // Apply styling rules to minor Grid elements on the X-axis in the theme
    myTheme.rule("Grid", ["x", "minor"]).setAll({
      strokeOpacity: 0.05, // Set the stroke opacity for minor grid lines on the X-axis
    })

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root), myTheme])

    // Create an XYChart instance and push it to the children of the root container
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true, // Enable panning along the X-axis
        panY: true, // Enable panning along the Y-axis
        wheelX: "panX", // Enable horizontal zooming with the mouse wheel
        wheelY: "zoomX", // Enable vertical zooming with the mouse wheel
        maxTooltipDistance: 0, // This influences how far off distances from the tooltip will be tracked
        pinchZoomX: true, // Enable pinch-to-zoom on touch devices along the X-axis
      })
    )

    // Create a new DateAxis and push it to the xAxes array of the chart
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2, // Set the maximum allowed deviation for the axis scale
        baseInterval: {
          timeUnit: "day", // Set the base time unit to "day"
          count: 1, // Set the base interval count to 1 day
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true, // Enable minor grid lines on the X-axis
        }),
        tooltip: am5.Tooltip.new(root, {}), // Enable tooltips for the X-axis
      })
    )

    // Create a new ValueAxis and push it to the yAxes array of the chart
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}), // Use the default renderer for the Y-axis
      })
    )

    // Add multiple line series to the chart
    // The loop creates 10 line series with different names and configurations
    for (let i = 0; i < numOfLines; i++) {
      // Create a new LineSeries and push it to the series array of the chart
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Series " + i, // Set the name of the series for reference or legend
          xAxis: xAxis, // Associate the series with the X-axis
          yAxis: yAxis, // Associate the series with the Y-axis
          valueYField: "value", // Use the "value" field for the Y-axis values
          valueXField: "date", // Use the "date" field for the X-axis values
          legendValueText: "{valueY}", // Configure the legend to show the Y-axis value
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal", // Set the pointer orientation of the tooltip
            labelText: "{valueY}", // Configure the tooltip to show the Y-axis value
          }),
        })
      )

      // Set the data for the series
      series.data.setAll(data[i])

      // Make the series appear with animation on load
      series.appear()
    }

    // Add a cursor to the chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none", // Set the cursor behavior to "none"
      })
    )
    cursor.lineY.set("visible", false) // Hide the vertical cursor line (lineY)
    // cursor.lineX.set("visible", false)

    // Add horizontal scrollbar to the chart for X-axis
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    )

    // Add vertical scrollbar to the chart for Y-axis
    chart.set(
      "scrollbarY",
      am5.Scrollbar.new(root, {
        orientation: "vertical",
      })
    )

    // Add legend to the rightAxesContainer of the chart
    let legend = chart.rightAxesContainer.children.push(
      am5.Legend.new(root, {
        width: 200, // Set the width of the legend
        paddingLeft: 15, // Set the left padding of the legend
        height: am5.percent(100), // Set the height of the legend to 100% of the container
      })
    )

    // When a legend item container is hovered, execute the specified function
    legend.itemContainers.template.events.on("pointerover", function (e) {
      let itemContainer = e.target

      // Get the series associated with the hovered legend item
      let series = itemContainer.dataItem.dataContext

      // Iterate through all chart series
      chart.series.each(function (chartSeries) {
        // Dim all series except the hovered one
        if (chartSeries !== series) {
          chartSeries.strokes.template.setAll({
            strokeOpacity: 0.15,
            stroke: am5.color(0x000000),
          })
        } else {
          // Highlight the strokes of the hovered series
          chartSeries.strokes.template.setAll({
            strokeWidth: 3,
          })
        }
      })
    })

    // When legend item container is unhovered, make all series as they are
    // Add an event listener for the "pointerout" event on the legend item containers

    legend.itemContainers.template.events.on("pointerout", function (e) {
      let itemContainer = e.target
      let series = itemContainer.dataItem.dataContext

      chart.series.each(function (chartSeries) {
        chartSeries.strokes.template.setAll({
          strokeOpacity: 1,
          strokeWidth: 1,
          stroke: chartSeries.get("fill"),
        })
      })
    })

    // Set the width of legend item containers to 100% (full width)
    legend.itemContainers.template.set("width", am5.p100)

    // Set visual properties for legend value labels
    legend.valueLabels.template.setAll({
      width: am5.p100, // Set the width of value labels to 100% (full width)
      textAlign: "right", // Align the text to the right within the label
    })

    // It's important to set legend data after all the events are set on the template,
    // otherwise, events won't be copied correctly
    legend.data.setAll(chart.series.values)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [data, numOfLines])
  return (
    <div id='chartdiv' className={styling}>
      {chartName}
    </div>
  )
}

export default MultipleLineChart
