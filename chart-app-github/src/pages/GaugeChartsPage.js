import React from "react"
import { Link } from "react-router-dom"
const GaugeChartsPage = () => {
  const gaugeChartsLink = "/gauge-charts"
  const gaugeChartsList = [
    {
      name: "Yes or No Gauge",
      link: `${gaugeChartsLink}/yes-or-no`,
    },

    // {
    //   name: "Minimal Multiple Line Chart",
    //   link: `${lineChartsLink}/minimal-multiple-line-chart`,
    // },
  ]
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h1 className='text-4xl font-bold mb-8'>Gauge Charts</h1>
      <div className='grid grid-cols-4 gap-4'>
        {gaugeChartsList.map((chart, index) => {
          return (
            <Link to={chart.link} key={index}>
              <div className='flex flex-grow'></div>
              <button className='bg-blue-500 text-white p-4 rounded w-full'>
                {chart.name}
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default GaugeChartsPage
