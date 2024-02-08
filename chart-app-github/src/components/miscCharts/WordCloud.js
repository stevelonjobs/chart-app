import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5wc from "@amcharts/amcharts5/wc"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
const WordCloud = ({
  data,
  chartName,
  styling,
  minFontSize,
  maxFontSize,
  maxCount,
  minWordLength,
  fontFamily,
}) => {
  useEffect(() => {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv")

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Add series
    // https://www.amcharts.com/docs/v5/charts/word-cloud/
    let series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        maxCount: maxCount,
        minWordLength: minWordLength,
        maxFontSize: am5.percent(maxFontSize),
        minFontSize: am5.percent(minFontSize),
        text: data,
      })
    )

    // Configure labels
    series.labels.template.setAll({
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      fontFamily: fontFamily,
    })

    return () => root.dispose()
  })
  return (
    <div id='chartdiv' className={styling}>
      {chartName}
    </div>
  )
}

export default WordCloud
