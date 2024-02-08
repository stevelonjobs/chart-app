import * as am5 from "@amcharts/amcharts5"

let date = new Date()
date.setHours(0, 0, 0, 0)
let value = 100

function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value)
  am5.time.add(date, "day", 1)
  return {
    date: date.getTime(),
    value: value,
  }
}

function generateDatas(count) {
  let data = []
  for (var i = 0; i < count; ++i) {
    data.push(generateData())
  }
  return data
}

const count = 30
const simpleColumnChartData = generateDatas(count)

export default simpleColumnChartData
