import React from "react"
import { Link } from "react-router-dom"

const PieChartsPage = () => {
  const pieChartsLink = "/pie-charts"
  const pieChartsList = [
    {
      name: "Master Pie Chart",
      link: `${pieChartsLink}/master`,
    },
    {
      name: "Simple",
      link: `${pieChartsLink}/simple`,
    },
    {
      name: "Donut",
      link: `${pieChartsLink}/donut`,
    },

    {
      name: "Grainy",
      link: `${pieChartsLink}/grainy`,
    },
    {
      name: "Variable Radius",
      link: `${pieChartsLink}/var-radius`,
    },
    {
      name: "Draggable Slices",
      link: `${pieChartsLink}/draggable-slices`,
    },
    {
      name: "Semi",
      link: `${pieChartsLink}/semi`,
    },
    {
      name: "Radial Gradient",
      link: `${pieChartsLink}/radial-gradient`,
    },
  ]
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h1 className='text-4xl font-bold mb-8'>Pie Charts</h1>
      <div className='grid grid-cols-4 gap-4'>
        {pieChartsList.map((chart, index) => {
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

export default PieChartsPage
