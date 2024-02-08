import React from "react"
import { Link } from "react-router-dom"
const HomePage = () => {
  const chartsList = [
    { name: "Pie Charts", link: "/pie-charts" },
    { name: "Column Charts", link: "/column-charts" },
    { name: "Line Charts", link: "/line-charts" },
    { name: "Gauge Charts", link: "/gauge-charts" },
    { name: "Misc Charts", link: "/misc-charts" },
    { name: "Funnel Charts", link: "/funnel-charts" },
    { name: "Pie Chart", link: "/pie-chart" },
    { name: "Pie Chart", link: "/pie-chart" },
  ]

  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h1 className='text-4xl font-bold mb-8'>Charts</h1>

      <div className='grid grid-cols-4 gap-4'>
        {chartsList.map((chart, index) => {
          return (
            <Link to={chart.link} key={index}>
              <div className='flex flex-grow'>
                <button className='bg-blue-500 text-white p-4 rounded w-full'>
                  {chart.name}
                </button>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
