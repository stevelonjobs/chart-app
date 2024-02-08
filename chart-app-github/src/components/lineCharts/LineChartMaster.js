/* this can be configured in the following ways:
(data, styling, chartName) : mandatory props (necessarily needs to be passed into all the graphs)
(hasScrollBarX, hasScrollBarY) : optional props (can be passed into all graphs to enable x and y axis scroll bars)
1. simple line chart:
  - just pass the mandatory values, passing all others as false or not passing them at all
2. line chart with target
  - pass hasTarget as true and pass targetValue and targetName(target name to be visible on the graph). passing all others as false or not passing them at all
3. multiple line chart
  - pass isMultiLine as true and the relevant multiLine data. passing all others as false or not passing them at all
4. minimal multi line chart, in which puts legend values on the graph (applies for upto 3 lines)
  - pass isMultiLine as true and the relevant multiLine data. passing all others as false or not passing them at all
5. draggable target chart
  - pass hasDraggableTarget as true. passing all others as false or not passing them at all
6. range slider
  - pass hasRangeSlider as true. passing all others as false or not passing them at all
7. minor grid lines
  - pass hasMinorGridLines as true. passing all others as false or not passing them at all
*/
import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
const LineChart = ({
  data,
  styling,
  chartName,
  hasScrollBarX,
  hasScrollBarY,
  isMultiLine,
  hasTarget,
  targetValue,
  targetName,
  hasDraggableTarget,
  hasRangeSlider,
  hasMinorGridLines,
  // xAxisDataName,
  // yAxisDataName,
}) => {
  useEffect(() => {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    // console.log(data)
    const numOfLines = data.length

    let xAxisDataName, yAxisDataName
    if (isMultiLine) {
      for (let key in data[0][0]) {
        if (key.includes("date") || key.includes("time")) {
          xAxisDataName = key
        } else {
          yAxisDataName = key
        }
      }
    } else {
      for (let key in data[0]) {
        if (key.includes("date") || key.includes("time")) {
          xAxisDataName = key
        } else {
          yAxisDataName = key
        }
      }
    }

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
        maxTooltipDistance: (isMultiLine && numOfLines) <= 3 ? 200 : 0,
      })
    )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    )
    cursor.lineY.set("visible", false)

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minorLabelsEnabled: hasMinorGridLines ? true : false,
          minGridDistance: 200,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom",
        }),
      })
    )
    let series
    if (!isMultiLine) {
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: yAxisDataName, //props
          valueXField: xAxisDataName, //props
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      )

      series.data.setAll(data)

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000)
    } else {
      // multi line graph
      // Add multiple line series to the chart
      // The loop creates 10 line series with different names and configurations
      for (let i = 0; i < numOfLines; i++) {
        // Create a new LineSeries and push it to the series array of the chart
        series = chart.series.push(
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

        // It's important to set legend data after all the events are set on the template,
        // otherwise, events won't be copied correctly
        // Set the data for the series
        series.data.setAll(data[i])

        // Make the series appear with animation on load
        series.appear()
      }
    }

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

    if (hasTarget) {
      // Create a new data item for the series range with specified values
      let seriesRangeDataItem = yAxis.makeDataItem({
        value: targetValue, //targetValue(props) is being set here
        endValue: 0,
      })

      // Create a new range on the series and associate it with the data itemx
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
    }

    if (isMultiLine) {
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
    }

    if (hasDraggableTarget) {
      // DRAGGABLE RANGE
      // add series range
      let rangeDataItem = yAxis.makeDataItem({})
      yAxis.createAxisRange(rangeDataItem)

      // create container for all elements, you can put anything you want top it
      let container = am5.Container.new(root, {
        centerY: am5.p50,
        draggable: true,
        layout: root.horizontalLayout,
      })

      // restrict from being dragged vertically
      container.adapters.add("x", function () {
        return 0
      })

      // restrict from being dragged outside of plot
      container.adapters.add("y", function (y) {
        return Math.max(0, Math.min(chart.plotContainer.height(), y))
      })

      // change range when y changes
      container.events.on("dragged", function () {
        updateLabel()
      })

      // this is needed for the bullets to be interactive, above the plot
      yAxis.topGridContainer.children.push(container)

      // create bullet and set container as a bullets sprite
      rangeDataItem.set(
        "bullet",
        am5xy.AxisBullet.new(root, {
          sprite: container,
        })
      )

      // decorate grid of a range
      rangeDataItem.get("grid").setAll({
        strokeOpacity: 1,
        visible: true,
        stroke: am5.color(0x000000),
        strokeDasharray: [2, 2],
      })

      // create background for the container
      let background = am5.RoundedRectangle.new(root, {
        fill: am5.color(0xffffff),
        fillOpacity: 1,
        strokeOpacity: 0.5,
        cornerRadiusTL: 0,
        cornerRadiusBL: 0,
        cursorOverStyle: "ns-resize",
        stroke: am5.color(0xff0000),
      })

      container.set("background", background)

      // add label to container, this one will show value and text
      let label = container.children.push(
        am5.Label.new(root, {
          paddingTop: 5,
          paddingBottom: 5,
        })
      )

      // add x button
      let xButton = container.children.push(
        am5.Button.new(root, {
          cursorOverStyle: "pointer",
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 2,
          paddingRight: 8,
        })
      )

      // add label to the button (you can add icon instead of a label)
      xButton.set(
        "label",
        am5.Label.new(root, {
          text: "X",
          paddingBottom: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
          fill: am5.color(0xff0000),
        })
      )

      // modify background of x button
      xButton.get("background").setAll({
        strokeOpacity: 0,
        fillOpacity: 0,
      })

      // dispose item when x button is clicked
      xButton.events.on("click", function () {
        yAxis.disposeDataItem(rangeDataItem)
      })

      function updateLabel(value) {
        let y = container.y()
        let position = yAxis.toAxisPosition(y / chart.plotContainer.height())

        if (value == null) {
          value = yAxis.positionToValue(position)
        }

        label.set(
          "text",
          root.numberFormatter.format(value, "#.00") + ">Stop loss"
        )

        rangeDataItem.set("value", value)
      }

      // when data is validated, set range value to the middle
      series.events.on("datavalidated", () => {
        let max = yAxis.getPrivate("max", 1)
        let min = yAxis.getPrivate("min", 0)

        let value = min + (max - min) / 2
        rangeDataItem.set("value", value)
        updateLabel(value)
      })
    }

    if (hasRangeSlider) {
      let rangeDate = new Date()
      am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2))
      let rangeTime = rangeDate.getTime()

      // add series range
      let seriesRangeDataItem = xAxis.makeDataItem({})
      let seriesRange = series.createAxisRange(seriesRangeDataItem)
      seriesRange.fills.template.setAll({
        visible: true,
        opacity: 0.3,
      })

      seriesRange.fills.template.set(
        "fillPattern",
        am5.LinePattern.new(root, {
          color: am5.color(0xff0000),
          rotation: 45,
          strokeWidth: 2,
          width: 2000,
          height: 2000,
          fill: am5.color(0xffffff),
        })
      )

      seriesRange.strokes.template.set("stroke", am5.color(0xff0000))

      xAxis.onPrivate("max", function (value) {
        seriesRangeDataItem.set("endValue", value)
        seriesRangeDataItem.set("value", rangeTime)
      })

      // add axis range
      let range = xAxis.createAxisRange(xAxis.makeDataItem({}))
      let color = root.interfaceColors.get("primaryButton")

      range.set("value", rangeDate.getTime())
      range.get("grid").setAll({
        strokeOpacity: 1,
        stroke: color,
      })

      let resizeButton = am5.Button.new(root, {
        themeTags: ["resize", "horizontal"],
        icon: am5.Graphics.new(root, {
          themeTags: ["icon"],
        }),
      })

      // restrict from being dragged vertically
      resizeButton.adapters.add("y", function () {
        return 0
      })

      // restrict from being dragged outside of plot
      resizeButton.adapters.add("x", function (x) {
        return Math.max(0, Math.min(chart.plotContainer.width(), x))
      })

      // change range when x changes
      resizeButton.events.on("dragged", function () {
        let x = resizeButton.x()
        let position = xAxis.toAxisPosition(x / chart.plotContainer.width())

        let value = xAxis.positionToValue(position)

        range.set("value", value)

        seriesRangeDataItem.set("value", value)
        seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"))
      })

      // set bullet for the range
      range.set(
        "bullet",
        am5xy.AxisBullet.new(root, {
          sprite: resizeButton,
        })
      )
    }

    if (hasMinorGridLines) {
      xAxis.set("minorDateFormats", {
        day: "dd",
        month: "MM",
      })

      series.bullets.push(function () {
        let bulletCircle = am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill"),
        })
        return am5.Bullet.new(root, {
          sprite: bulletCircle,
        })
      })
    }

    chart.appear(1000, 100)

    return () => root.dispose()
  }, [
    data,
    styling,
    chartName,
    hasScrollBarX,
    hasScrollBarY,
    isMultiLine,
    hasTarget,
    targetValue,
    targetName,
    hasDraggableTarget,
    hasRangeSlider,
    hasMinorGridLines,
    // xAxisDataName,
    // yAxisDataName,
  ])
  return (
    <div id='chartdiv' className={styling}>
      {chartName}
    </div>
  )
}

export default LineChart
