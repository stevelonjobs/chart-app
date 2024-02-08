import React from "react"
import { Link } from "react-router-dom"

const LineChartsPage = () => {
  const lineChartsLink = "/line-charts"
  const lineChartsList = [
    {
      name: "Master Line Chart",
      link: `${lineChartsLink}/master`,
    },
    {
      name: "Line Chart with Target",
      link: `${lineChartsLink}/line-chart-target`,
    },

    {
      name: "Minimal Multiple Line Chart",
      link: `${lineChartsLink}/minimal-multiple-line-chart`,
    },
    {
      name: "Multiple Line Chart",
      link: `${lineChartsLink}/multiple-line-chart`,
    },
    {
      name: "Draggable Line Chart",
      link: `${lineChartsLink}/draggable-line-chart`,
    },
    {
      name: "Range Slider",
      link: `${lineChartsLink}/range-slider`,
    },
    {
      name: "Minor Grid Lines",
      link: `${lineChartsLink}/minor-grid-lines`,
    },
  ]
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h1 className='text-4xl font-bold mb-8'>Line Charts</h1>
      <div className='grid grid-cols-4 gap-4'>
        {lineChartsList.map((chart, index) => {
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

export default LineChartsPage
