import React from "react"
import WordCloud from "../../../components/miscCharts/WordCloud"
import wordCloudData from "../../../data/wordCloudData"

const WorldCloudParent = () => {
  return (
    <WordCloud
      data={wordCloudData}
      chartName='Word Cloud'
      styling='w-90 h-96 m-12 text-center'
      minFontSize={5}
      maxFontSize={75}
      maxCount={100}
      minWordLength={4}
      fontFamily='Ariel'
    />
  )
}

export default WorldCloudParent
