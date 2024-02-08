import React, { useEffect } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import * as am5map from "@amcharts/amcharts5/map"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow"
import am4geodata_worldIndiaLow from "@amcharts/amcharts4-geodata/worldIndiaLow"
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow"
// import am5geodata_worldIndiaLow from "@amcharts/amcharts5-geodata/worldIndiaLow"
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2"
import jsonData from "../india.json"
const DrillDownMap = () => {
  useEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv")

    // Create a ColorSet to manage colors in the chart
    let colors = am5.ColorSet.new(root, {})

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX", // Enables rotation on the X-axis when panning
        projection: am5map.geoEquirectangular(), // Sets the map projection to Albers USA projection.
        // it's just a way of projecting, it doesn't influence what map is getting displayed
      })
    )

    // Create polygon series for the world map
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let usaSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_data_countries2, // Use geoJSON data for the USA map  geoJSON: am5geodata_worldLow, for india
      })
    )
    console.log(am5geodata_data_countries2)
    console.log(jsonData)
    usaSeries.mapPolygons.template.setAll({
      tooltipText: "{name}", // Set the tooltip text to display the name of the polygon
      interactive: true, // Allow the polygon to be interactive (e.g., hover and click events)
      fill: am5.color(0xaaaaaa), // Set the fill color of the polygon to a light gray (hex color)
      templateField: "polygonSettings", // Use a template field named "polygonSettings" for additional settings
    })

    usaSeries.mapPolygons.template.states.create("hover", {
      fill: colors.getIndex(9), // Create a new state for hover interactions on the mapPolygons template
    })

    // - The mapPolygons template's states property is used to define different states for the polygons.
    // - The create method is called to create a new state named "hover" for hover interactions.
    // - Within the "hover" state, the fill property is set to change the fill color of polygons to a color from the color set when hovered over.

    usaSeries.mapPolygons.template.events.on("click", (ev) => {
      let dataItem = ev.target.dataItem // Get the dataItem associated with the clicked polygon
      let id = dataItem.get("id").toLowerCase().split("-").pop() // Extract and format the ID of the clicked polygon
      let name = dataItem.dataContext.name // Get the name of the clicked polygon from its data context
      let zoomAnimation = usaSeries.zoomToDataItem(dataItem) // Trigger a zoom animation to the clicked polygon

      // - The click event handler is triggered when a polygon is clicked.
      // - It retrieves information about the clicked polygon, such as its dataItem and name.
      // - The ID is extracted and formatted by converting it to lowercase and splitting by hyphen.
      // - A zoom animation is initiated to zoom in to the clicked polygon on the map.

      Promise.all([
        zoomAnimation.waitForStop(), // Wait for the zoom animation to complete
        am5.net.load(
          "https://cdn.amcharts.com/lib/5/geodata/json/region/usa/congressional2022/" +
            id +
            "Low.json", // Load additional geodata for the clicked region using the ID
          chart
        ),
      ]).then(function (results) {
        let geodata = am5.JSONParser.parse(results[1].response) // Parse the loaded geodata
        stateSeries.setAll({
          geoJSON: geodata, // Set the geoJSON property of the stateSeries to the loaded geodata
        })

        stateSeries.show() // Show the stateSeries with the new geodata
        usaSeries.hide(100) // Hide the usaSeries with a fade-out duration of 100 milliseconds
        backContainer.show() // Show the back button container
        title.set("text", name) // Set the chart title text to the name of the clicked region
      })
    })

    // Create polygon series for the country map
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let stateSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        visible: false, // Set the initial visibility of the stateSeries to false
      })
    )

    stateSeries.mapPolygons.template.setAll({
      tooltipText: "{name}", // Set the tooltip text for each polygon to the name of the region
      interactive: true, // Enable interactivity for the polygons
      fill: am5.color(0xaaaaaa), // Set the fill color for all polygons in the series. light gray
    })

    stateSeries.mapPolygons.template.states.create("hover", {
      fill: colors.getIndex(9), // Set the fill color for polygons on hover using a color from the color set. district colouring
    }) // there's a color set and index 9 is red

    // Add button to go back to continents view
    let backContainer = chart.children.push(
      am5.Container.new(root, {
        x: am5.p100, // Set the x-coordinate of the container to 100% (right edge of the parent container)
        centerX: am5.p100, // Center the container horizontally at 100% (right edge of the parent container)
        dx: -10, // Set a horizontal displacement of -10 (moves the container 10 pixels to the left)
        paddingTop: 5, // Add padding of 5 pixels to the top of the container
        paddingRight: 10, // Add padding of 10 pixels to the right of the container
        paddingBottom: 5, // Add padding of 5 pixels to the bottom of the container
        y: 30, // Set the y-coordinate of the container to 30 (vertical position)
        interactiveChildren: false, // Make child elements not interactive
        layout: root.horizontalLayout, // Use horizontal layout for child elements
        cursorOverStyle: "pointer", // Set the cursor style to "pointer" when hovering over the container
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff), // Set the fill color of the background to white
          fillOpacity: 0.2, // Set the opacity of the background fill to 20%
        }),
        visible: false, // Initially, set the container to be invisible
      })
    )

    let backLabel = backContainer.children.push(
      am5.Label.new(root, {
        text: "Back", // Set the text content of the label to "Back"
        centerY: am5.p50, // Center the label vertically at 50% of the container's height
      })
    )

    let backButton = backContainer.children.push(
      am5.Graphics.new(root, {
        width: 32, // Set the width of the graphics element to 32 pixels
        height: 32, // Set the height of the graphics element to 32 pixels
        centerY: am5.p50, // Center the graphics element vertically at 50% of the container's height
        fill: am5.color(0x555555), // Set the fill color of the graphics element to a dark gray (hex color)
        svgPath:
          "M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A.999.999 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941z",
        // Set the SVG path data for the graphics element, creating an arrow icon
      })
    )

    backContainer.events.on("click", function () {
      chart.goHome() // Return the chart to its initial view (home)
      usaSeries.show() // Show the USA map series
      stateSeries.hide() // Hide the state map series
      backContainer.hide() // Hide the backContainer element
      title.set("text", "United States") // Set the text content of the title to "United States"
    })

    let title = chart.children.push(
      am5.Label.new(root, {
        text: "United States", // Set the initial text content of the label to "United States"
        x: am5.p50, // Set the x-coordinate of the label to the center of the chart (50%)
        y: 5, // Set the y-coordinate of the label to 5 pixels from the top
        fontSize: 20, // Set the font size of the label to 20 pixels
        textAlign: "center", // Set the text alignment to center
      })
    )

    return () => {
      root.dispose()
    }
  })
  return (
    <div id='chartdiv' className='h-96 m-12 text-center'>
      Drill Down Map
    </div>
  )
}

export default DrillDownMap
