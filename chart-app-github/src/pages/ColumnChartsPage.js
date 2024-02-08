import React from "react"
import { Link } from "react-router-dom"

const ColumnChartsPage = () => {
  const columnChartsLink = "/column-charts"
  const columnChartsList = [
    {
      name: "Master Chart",
      link: `${columnChartsLink}/master`,
    },
    {
      name: "Date",
      link: `${columnChartsLink}/date`,
    },
    {
      name: "Rotated Labels",
      link: `${columnChartsLink}/rotated-labels`,
    },
    {
      name: "Clustered",
      link: `${columnChartsLink}/clustered`,
    },
    {
      name: "Stacked",
      link: `${columnChartsLink}/stacked`,
    },
    {
      name: "Grainy Gradient",
      link: `${columnChartsLink}/grainy-gradient`,
    },
    {
      name: "Curved Column",
      link: `${columnChartsLink}/curved-column`,
    },
    {
      name: "Lollipop Chart",
      link: `${columnChartsLink}/lollipop-chart`,
    },
    {
      name: "Variance Indicator",
      link: `${columnChartsLink}/variance-indicator`,
    },
  ]
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h1 className='text-4xl font-bold mb-8'>Column Charts</h1>
      <div className='grid grid-cols-4 gap-4'>
        {columnChartsList.map((chart, index) => {
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

export default ColumnChartsPage
