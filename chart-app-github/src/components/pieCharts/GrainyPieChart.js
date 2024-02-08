import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
const GrainyPieChart = ({
  data,
  chartName,
  valueName,
  categoryName,
  styling,
}) => {
  useEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        // endAngle: 270, // Set the end angle for the pie chart
        layout: root.verticalLayout, // Use vertical layout for the chart
        innerRadius: am5.percent(60), // Set the inner radius for the pie chart
      })
    )

    /*
  let bg = root.container.set("background", am5.Rectangle.new(root, {
    fillPattern: am5.GrainPattern.new(root, {
      density: 0.1,
      maxOpacity: 0.2
    })
  }))
  
  */

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: valueName, // Set the field from data for values
        categoryField: categoryName, // Set the field from data for categories
        // endAngle: 270, // Set the end angle for the series
      })
    )

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

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data)

    // let legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerX: am5.percent(50), // Center the legend horizontally at 50% of the chart
    //     x: am5.percent(50), // Set the x-coordinate of the legend to 50% of the chart
    //     marginTop: 15, // Set the top margin of the legend
    //     marginBottom: 15, // Set the bottom margin of the legend
    //   })
    // )

    // legend.markerRectangles.template.adapters.add("fillGradient", function () {
    //   return undefined // Remove the fill gradient from the legend marker rectangles
    // })

    // legend.data.setAll(series.dataItems) // Set the data items for the legend from the series data items

    series.appear(1000, 100)

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

export default GrainyPieChart
