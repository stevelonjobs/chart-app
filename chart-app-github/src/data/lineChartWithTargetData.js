// Generate random data using amCharts library
import * as am5 from "@amcharts/amcharts5"
// const am5 = require("@amcharts/amcharts5")
// Create a new Date object to represent the starting date
let date = new Date()
date.setHours(0, 0, 0, 0) // Set the hours, minutes, seconds, and milliseconds of the date to midnight

// Function to generate a single data point
function generateData() {
  // Generate a random value between 600 and 1200
  let value = Math.floor(Math.random() * (1200 - 600 + 1)) + 600

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
  for (let i = 0; i < count; ++i) {
    // Push a new data point to the 'data' array by calling 'generateData'
    data.push(generateData())
  }
  // Return the generated array of data points
  return data
}

// Specify the number of data points to generate
const count = 300

// Generate the data set with 300 data points
const lineChartWithTargetData = generateDatas(count)

// Export the generated data for use in other parts of the application
export { lineChartWithTargetData }
