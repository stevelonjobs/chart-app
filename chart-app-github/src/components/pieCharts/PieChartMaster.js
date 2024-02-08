import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

const PieChartMaster = ({
  data,
  styling,
  chartName,
  isDonut,
  isGrainy,
  hasVarRadius,
  hasDraggableSlices,
  isSemiPie,
  isRadialGradient,
  // chartValueField,
  // chartCategoryField,
}) => {
  useEffect(() => {
    // Create root and chart
    let root = am5.Root.new("chartdiv")
    //Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    let chartValueField, chartCategoryField
    for (let key in data[0]) {
      if (typeof data[0][key] === "number") {
        chartValueField = key
      } else {
        chartCategoryField = key
      }
    }

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout:
          isGrainy || hasVarRadius || isDonut
            ? root.verticalLayout
            : root.verticalHorizontal,
        innerRadius:
          isGrainy || isSemiPie || isRadialGradient || isDonut
            ? am5.percent(50)
            : 0,
        startAngle: isSemiPie ? 180 : 0,
        endAngle: 360,
        // radius: am5.percent(90),
      })
    )

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: chartValueField,
        categoryField: chartCategoryField,
        alignLabels: hasVarRadius ? true : false,
        calculateAggregates: hasVarRadius ? true : false,
        startAngle: isSemiPie ? 180 : 0,
        endAngle: 360,
      })
    )

    if (isDonut) {
      series.labels.template.setAll({
        //   textType: "circular",
        centerX: 0,
        centerY: 0,
      })
    }

    if (isGrainy) {
      series.set(
        "colors",
        am5.ColorSet.new(root, {
          colors: [
            // Set custom colors for the pie slices
            am5.color(0x73556e),
            am5.color(0x9fa1a6),
            am5.color(0xf2aa6b),
            am5.color(0xf28f6b),
            //   am5.color(0xa95a52),
            //   am5.color(0xe35b5d),
            //   am5.color(0xffa446),
          ],
        })
      )

      let gradient = am5.RadialGradient.new(root, {
        stops: [
          { color: am5.color(0x000000) }, // First gradient stop with color black
          { color: am5.color(0x000000) }, // Second gradient stop with color black
          {}, // Third gradient stop, not defined (defaults may apply)
        ],
      })

      series.slices.template.setAll({
        fillGradient: gradient, // Apply the defined radial gradient to fill the slices
        strokeWidth: 2, // Set the stroke width for the slices
        stroke: am5.color(0xffffff), // Set the stroke color for the slices
        cornerRadius: 10, // Set the corner radius for rounded edges of the slices
        shadowOpacity: 0.1, // Set the opacity of the shadow for the slices
        shadowOffsetX: 2, // Set the horizontal offset of the shadow for the slices
        shadowOffsetY: 2, // Set the vertical offset of the shadow for the slices
        shadowColor: am5.color(0x000000), // Set the color of the shadow for the slices
        fillPattern: am5.GrainPattern.new(root, {
          // Apply a grain pattern as a fill for the slices
          maxOpacity: 0.2, // Set the maximum opacity of the grain pattern
          density: 0.5, // Set the density of the grain pattern
          colors: [am5.color(0x000000)], // Set the color(s) of the grain pattern
        }),
      })

      series.slices.template.states.create("hover", {
        shadowOpacity: 1, // Set the shadow opacity for the slices on hover
        shadowBlur: 10, // Set the blur radius of the shadow for the slices on hover
      })

      series.ticks.template.setAll({
        strokeOpacity: 0.4, // Set the stroke opacity for ticks on the pie chart
        strokeDasharray: [2, 2], // Set the dash pattern for the ticks (stroke dashes and gaps)
      })

      series.states.create("hidden", {
        endAngle: -90, // Set the end angle for slices when the series state is 'hidden'
      })
    }

    if (hasVarRadius) {
      series.slices.template.setAll({
        strokeWidth: 3,
        stroke: am5.color(0xffffff),
      })

      series.labelsContainer.set("paddingTop", 30)

      // Set up adapters for variable slice radius
      // https://www.amcharts.com/docs/v5/concepts/settings/adapters/
      series.slices.template.adapters.add("radius", function (radius, target) {
        let dataItem = target.dataItem
        let high = series.getPrivate("valueHigh")

        if (dataItem) {
          let value = target.dataItem.get("valueWorking", 0)
          return (radius * value) / high
        }
        return radius
      })
    }

    if (hasDraggableSlices) {
      // Create custom theme
      // https://www.amcharts.com/docs/v5/concepts/themes/#Quick_custom_theme
      let myTheme = am5.Theme.new(root)
      myTheme.rule("Label").set("fontSize", "0.8em")

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root), myTheme])
      // Create wrapper container
      let container = root.container.children.push(
        am5.Container.new(root, {
          width: am5.p100,
          height: am5.p100,
          layout: root.horizontalLayout,
        })
      )

      // Create first chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      let chart0 = container.children.push(
        am5percent.PieChart.new(root, {
          innerRadius: am5.p50,
          tooltip: am5.Tooltip.new(root, {}),
        })
      )

      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      let series0 = chart0.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "sales",
          categoryField: "menuItem",
          alignLabels: false,
        })
      )

      // series0.labels.template.setAll({
      //   textType: "circular",
      //   templateField: "dummyLabelSettings",
      // })

      series0.ticks.template.set("forceHidden", true)

      let sliceTemplate0 = series0.slices.template
      sliceTemplate0.setAll({
        draggable: true,
        templateField: "settings",
        cornerRadius: 5,
      })

      // Separator line
      container.children.push(
        am5.Line.new(root, {
          layer: 1,
          height: am5.percent(60),
          y: am5.p50,
          centerY: am5.p50,
          strokeDasharray: [4, 4],
          stroke: root.interfaceColors.get("alternativeBackground"),
          strokeOpacity: 0.5,
        })
      )

      // Label
      container.children.push(
        am5.Label.new(root, {
          layer: 1,
          text: "Drag slices over the line",
          y: am5.p50,
          textAlign: "center",
          rotation: -90,
          isMeasured: false,
        })
      )

      // Create second chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      let chart1 = container.children.push(
        am5percent.PieChart.new(root, {
          innerRadius: am5.p50,
          tooltip: am5.Tooltip.new(root, {}),
        })
      )

      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      let series1 = chart1.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "sales",
          categoryField: "menuItem",
          alignLabels: false,
        })
      )

      // series1.labels.template.setAll({
      //   textType: "circular",
      //   radius: 20,
      //   templateField: "dummyLabelSettings",
      // })

      series1.ticks.template.set("forceHidden", true)

      let sliceTemplate1 = series1.slices.template
      sliceTemplate1.setAll({
        draggable: true,
        templateField: "settings",
        cornerRadius: 5,
      })

      let previousDownSlice

      // change layers when down
      sliceTemplate0.events.on("pointerdown", function (e) {
        if (previousDownSlice) {
          //  previousDownSlice.set("layer", 0);
        }
        e.target.set("layer", 1)
        previousDownSlice = e.target
      })

      sliceTemplate1.events.on("pointerdown", function (e) {
        if (previousDownSlice) {
          // previousDownSlice.set("layer", 0);
        }
        e.target.set("layer", 1)
        previousDownSlice = e.target
      })

      // when released, do all the magic
      sliceTemplate0.events.on("pointerup", function (e) {
        series0.hideTooltip()
        series1.hideTooltip()

        let slice = e.target
        if (slice.x() > container.width() / 4) {
          let index = series0.slices.indexOf(slice)
          slice.dataItem.hide()

          let series1DataItem = series1.dataItems[index]
          series1DataItem.show()
          series1DataItem.get("slice").setAll({ x: 0, y: 0 })

          handleDummy(series0)
          handleDummy(series1)
        } else {
          slice.animate({
            key: "x",
            to: 0,
            duration: 500,
            easing: am5.ease.out(am5.ease.cubic),
          })
          slice.animate({
            key: "y",
            to: 0,
            duration: 500,
            easing: am5.ease.out(am5.ease.cubic),
          })
        }
      })

      sliceTemplate1.events.on("pointerup", function (e) {
        let slice = e.target

        series0.hideTooltip()
        series1.hideTooltip()

        if (slice.x() < container.width() / 4) {
          let index = series1.slices.indexOf(slice)
          slice.dataItem.hide()

          let series0DataItem = series0.dataItems[index]
          series0DataItem.show()
          series0DataItem.get("slice").setAll({ x: 0, y: 0 })

          handleDummy(series0)
          handleDummy(series1)
        } else {
          slice.animate({
            key: "x",
            to: 0,
            duration: 500,
            easing: am5.ease.out(am5.ease.cubic),
          })
          slice.animate({
            key: "y",
            to: 0,
            duration: 500,
            easing: am5.ease.out(am5.ease.cubic),
          })
        }
      })

      // show/hide dummy slice depending if there are other visible slices
      function handleDummy(series) {
        // count visible data items
        let visibleCount = 0
        am5.array.each(series.dataItems, function (dataItem) {
          if (!dataItem.isHidden()) {
            visibleCount++
          }
        })
        // if all hidden, show dummy
        if (visibleCount === 0) {
          series.dataItems[0].show()
        } else {
          series.dataItems[0].hide()
        }
      }
      // set data
      series0.data.setAll(data)
      series1.data.setAll(data)

      // hide all except dummy
      am5.array.each(series1.dataItems, function (dataItem) {
        if (dataItem.get("category") !== "Dummy") {
          dataItem.hide(0)
        }
      })

      // hide dummy
      series0.dataItems[0].hide(0)

      // reveal container
      container.appear(1000, 100)
    } else {
      series.data.setAll(data)
    }

    if (isSemiPie) {
      series.states.create("hidden", {
        startAngle: 180,
        endAngle: 180,
      })

      series.slices.template.setAll({
        cornerRadius: 5,
      })

      series.ticks.template.setAll({
        forceHidden: true,
      })
    }

    if (isRadialGradient) {
      // Disabling labels and ticks
      series.labels.template.set("visible", false)
      series.ticks.template.set("visible", false)

      // Adding gradients
      series.slices.template.set("strokeOpacity", 0)
      series.slices.template.set(
        "fillGradient",
        am5.RadialGradient.new(root, {
          stops: [
            {
              brighten: -0.8,
            },
            {
              brighten: -0.8,
            },
            {
              brighten: -0.5,
            },
            {
              brighten: 0,
            },
            {
              brighten: -0.5,
            },
          ],
        })
      )

      // Create legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerY: am5.percent(50),
          y: am5.percent(50),
          layout: root.verticalLayout,
        })
      )
      // set value labels align to right
      legend.valueLabels.template.setAll({ textAlign: "right" })
      // set width and max width of labels
      legend.labels.template.setAll({
        maxWidth: 140,
        width: 140,
        oversizedBehavior: "wrap",
      })

      legend.data.setAll(series.dataItems)
    }

    // // Add legend
    // let legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerX: am5.percent(50),
    //     x: am5.percent(50),
    //     layout: root.horizontalLayout,
    //   })
    // )

    // legend.data.setAll(series.dataItems)

    // Clean up when the component unmounts
    return () => {
      root.dispose()
    }
  }, [
    data,
    styling,
    chartName,
    isDonut,
    isGrainy,
    hasVarRadius,
    hasDraggableSlices,
    isSemiPie,
    isRadialGradient,
    // chartValueField,
    // chartCategoryField,
  ])

  return (
    <div
      id='chartdiv'
      // style={{ width: "100%", height: "400px", margin: 50 }}
      className={styling}
    >
      {chartName}
    </div>
  )
}

export default PieChartMaster
