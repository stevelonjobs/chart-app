import React, { useEffect } from "react"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive"
const ColumnChartMaster = ({
  data,
  chartName,
  styling,
  hasScrollBarX,
  hasScrollBarY,
  isDateColumnChart,
  isClustered,
  clusterCategory,
  hasRotatedLabels,
  isStacked,
  stackCategory,
  hasGrainyGradient,
  hasCurvedColumns,
  isLollipopChart,
  isVarianceChart,
  isXAxisValueNumber,
  xAxisValueName,
}) => {
  useEffect(() => {
    console.log(data)

    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    let xAxisValue, yAxisValue

    if (isXAxisValueNumber) {
      //setting xAxisValue and yAxisValue
      xAxisValue = xAxisValueName
      for (let key in data[0]) {
        if (key !== xAxisValue) {
          yAxisValue = key
        }
      }
    } else if (!isClustered && !isStacked && !isDateColumnChart) {
      //setting xAxisValue and yAxisValue
      for (let key in data[0]) {
        if (typeof data[0][key] === "number") {
          yAxisValue = key
        } else {
          //not a number
          xAxisValue = key
        }
      }
    }

    if (isDateColumnChart) {
      const myTheme = am5.Theme.new(root)

      myTheme.rule("AxisLabel", ["minor"]).setAll({
        dy: 1,
      })

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root),
        myTheme,
        am5themes_Responsive.new(root),
      ])

      xAxisValue = "date" //setting xAxisValue and yAxisValue
      for (let key in data[0]) {
        if (key !== xAxisValue) {
          yAxisValue = key
        }
      }

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          paddingLeft: 0,
        })
      )

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "zoomX",
        })
      )
      cursor.lineY.set("visible", false)

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0,
          baseInterval: {
            timeUnit: "day",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minorLabelsEnabled: true,
          }),
          tooltip: am5.Tooltip.new(root, {}),
        })
      )

      xAxis.set("minorDateFormats", {
        day: "dd",
        month: "MM",
      })

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      )

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: yAxisValue,
          valueXField: xAxisValue,
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      )

      series.columns.template.setAll({ strokeOpacity: 0 })

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

      series.data.setAll(data)

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000)
      chart.appear(1000, 100)
    } else if (isClustered) {
      //does not make use if xAxisValue and yAxisValue
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
          categoryField: clusterCategory, //props
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
            categoryXField: clusterCategory, //props
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
        if (key === clusterCategory) continue
        makeSeries(key)
      }

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100)
    } else if (hasRotatedLabels) {
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
          paddingRight: 1,
        })
      )
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}))
      cursor.lineY.set("visible", false)
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        minorGridEnabled: true,
      })
      xRenderer.labels.template.setAll({
        rotation: hasRotatedLabels - 90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
      })
      xRenderer.grid.template.setAll({
        location: 1,
      })
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: xAxisValue, //prop
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      )
      let yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1,
      })
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: yRenderer,
        })
      )
      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: yAxisValue, //prop
          sequencedInterpolation: true,
          categoryXField: xAxisValue, //prop
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      )
      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      })
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target))
      })
      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target))
      })
      xAxis.data.setAll(data)
      series.data.setAll(data)

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
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000)
      chart.appear(1000, 100)
    } else if (isStacked) {
      //does not make use if xAxisValue and yAxisValue
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

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xRenderer = am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
      })
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: stackCategory,
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
            categoryXField: stackCategory, //props
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

      for (let key in data[0]) {
        //my implentation to dynamically make series, also modified makeSeries for dynamism
        if (key === stackCategory) continue
        makeSeries(key)
      }

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100)
    } else if (hasGrainyGradient) {
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
          colors: [
            am5.color(0x000000),
            am5.color(0x000000),
            am5.color(0xffffff),
          ],
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
    } else if (hasCurvedColumns) {
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
          categoryField: xAxisValue, //props
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
          valueYField: yAxisValue, //props
          sequencedInterpolation: true,
          categoryXField: xAxisValue, //props
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
    } else if (isLollipopChart) {
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
          categoryField: xAxisValue, //props
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
          valueYField: yAxisValue, //props
          categoryXField: xAxisValue, //props
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
    } else if (isVarianceChart) {
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
    }

    return () => {
      root.dispose()
    }
  }, [
    data,
    chartName,
    styling,
    hasScrollBarX,
    hasScrollBarY,
    isDateColumnChart,
    isClustered,
    clusterCategory,
    hasRotatedLabels,
    isStacked,
    stackCategory,
    hasGrainyGradient,
    hasCurvedColumns,
    isLollipopChart,
  ])
  return (
    <div id='chartdiv' className={styling}>
      {chartName}
    </div>
  )
}

export default ColumnChartMaster
