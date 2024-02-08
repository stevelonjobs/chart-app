import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"

const PieChartComponent = ({
  data,
  chartValueField,
  chartCategoryField,
  styling,
  chartName,
}) => {
  // console.log(data)
  useEffect(() => {
    // Create root and chart
    let root = am5.Root.new("chartdiv")
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalHorizontal,
      })
    )

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: chartValueField,
        categoryField: chartCategoryField,
      })
    )
    series.data.setAll(data)

    // // Add legend
    // let legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerX: am5.percent(50),
    //     x: am5.percent(50),
    //     layout: root.horizontalLayout,
    //   })
    // );

    // legend.data.setAll(series.dataItems);

    // Clean up when the component unmounts
    return () => {
      root.dispose()
    }
  }, [data, chartCategoryField, chartValueField]) // Empty dependency array ensures the effect runs once on mount

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

export default PieChartComponent
