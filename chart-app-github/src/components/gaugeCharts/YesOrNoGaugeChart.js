import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import * as am5radar from "@amcharts/amcharts5/radar"
const YesOrNoGaugeChart = ({
  greenAreaName,
  redAreaName,
  thresholdVal,
  actualVal,
  chartName,
  styling,
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
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    let chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
      })
    )

    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    let axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -30,
      strokeOpacity: 0.1,
    })

    axisRenderer.labels.template.set("forceHidden", true)
    axisRenderer.grid.template.set("forceHidden", true)

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 1,
        strictMinMax: true,
        renderer: axisRenderer,
      })
    )

    function normalizeRatio(number1, number2) {
      // Ensure both numbers are non-negative
      const nonNegativeNumber1 = Math.max(0, number1)
      const nonNegativeNumber2 = Math.max(0, number2)

      // Calculate the total sum
      const totalSum = nonNegativeNumber1 + nonNegativeNumber2

      // Normalize the numbers based on the total sum
      const normalized1 = nonNegativeNumber1 / totalSum
      const normalized2 = nonNegativeNumber2 / totalSum

      return [normalized1, normalized2]
    }

    const [normalizedThersholdVal, normalizedActualVal] = normalizeRatio(
      thresholdVal,
      actualVal
    )

    // add yes and no labels
    let yesDataItem = xAxis.makeDataItem({})
    yesDataItem.set("value", 1)
    yesDataItem.set("endValue", normalizedThersholdVal)
    xAxis.createAxisRange(yesDataItem)
    yesDataItem.get("label").setAll({ text: greenAreaName, forceHidden: false })
    yesDataItem.get("axisFill").setAll({
      visible: true,
      fillOpacity: 1,
      fill: root.interfaceColors.get("positive"),
    })

    let noDataItem = xAxis.makeDataItem({})
    noDataItem.set("value", 0)
    noDataItem.set("endValue", normalizedThersholdVal)
    xAxis.createAxisRange(noDataItem)
    noDataItem.get("label").setAll({ text: redAreaName, forceHidden: false })
    noDataItem.get("axisFill").setAll({
      visible: true,
      fillOpacity: 1,
      fill: root.interfaceColors.get("negative"),
    })

    // Add clock hand
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
    let axisDataItem = xAxis.makeDataItem({})
    axisDataItem.set("value", normalizedActualVal)

    let bullet = axisDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        sprite: am5radar.ClockHand.new(root, {
          radius: am5.percent(99),
        }),
      })
    )

    xAxis.createAxisRange(axisDataItem)

    axisDataItem.get("grid").set("visible", false)

    // let value = 0.25
    // setInterval(function () {
    //   if (value == 0.25) {
    //     value = 0.75
    //   } else {
    //     value = 0.25
    //   }

    //   axisDataItem.animate({
    //     key: "value",
    //     to: value,
    //     duration: 800,
    //     easing: am5.ease.out(am5.ease.cubic),
    //   })
    // }, 2000)

    // Make stuff animate on load
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  })
  return (
    <div id='chartdiv' className={styling}>
      {chartName}
    </div>
  )
}

export default YesOrNoGaugeChart
