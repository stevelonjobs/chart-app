import * as am5 from "@amcharts/amcharts5"

// Create a new Date object to represent the starting date
let date = new Date()

// Set the hours, minutes, seconds, and milliseconds of the date to midnight
date.setHours(0, 0, 0, 0)
// console.log(date)
// console.log(date.getTime())

// Initialize a variable 'value' with the value 100
let value = 100

// Function to generate a single data point
function generateData() {
  // Update 'value' based on a random value and the previous 'value'
  value = Math.round(Math.random() * 10 - 4.2 + value)

  // Add a day to the 'date' to simulate consecutive dates
  am5.time.add(date, "day", 1)

  // Return an object with the current time of 'date' and the generated 'value'
  return {
    date: date.getTime(),
    value: value,
  }
}

// Function to generate an array of data points with the specified count
function generateDatas(count) {
  let data = []
  for (var i = 0; i < count; ++i) {
    // Push a new data point to the 'data' array by calling 'generateData'
    data.push(generateData())
  }
  // Return the generated array of data points
  return data
}

let multipleLineChartData = []
for (let i = 0; i < 10; i++) {
  //creating multiple series here

  // Reset the date and value for generating new data for each series
  date = new Date()
  date.setHours(0, 0, 0, 0)
  value = 0
  let count = 100 //specifies the number of data points for each series
  let dataSet = generateDatas(count)
  multipleLineChartData.push(dataSet)
}

// console.log(multipleLineChartData)

export { multipleLineChartData }
