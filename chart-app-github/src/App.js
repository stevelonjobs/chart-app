import "./App.css"
import HomePage from "./pages/HomePage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import ColumnChartsPage from "./pages/ColumnChartsPage"
import RotatedLabelChartParent from "./pages/charts/columnCharts/RotatedLabelChartParent"
import ClusteredChartParent from "./pages/charts/columnCharts/ClusteredChartParent"
import LineChartsPage from "./pages/LineChartsPage"
import LineChartWithTargetParent from "./pages/charts/lineCharts/LineChartWithTargetParent"
import MultipleLineChartParent from "./pages/charts/lineCharts/MultipleLineChartParent"
import MinimalMultipleLineChartParent from "./pages/charts/lineCharts/MinimalMultipleLineChartParent"
// import Test from "./components/Test"
import PieChartsPage from "./pages/PieChartsPage"
import CropProtectionSalesPieChart from "./pages/charts/pieCharts/CropProtectionSalesPieChart"
import GrainyPieChartParent from "./pages/charts/pieCharts/GrainyPieChartParent"
// import DrillDownMap from "./components/DrillDownMap"
// import IndiaMap from "./components/IndiaMap"
import GaugeChartsPage from "./pages/GaugeChartsPage"
import YesOrNoGaugeChartParent from "./pages/charts/gaugeCharts/YesOrNoGaugeChartParent"
import MiscChartsPage from "./pages/MiscChartsPage"
import WorldCloudParent from "./pages/charts/miscCharts/WordCloudParent"
import FunnelChartsPage from "./pages/FunnelChartsPage"
import FunnelChartParent from "./pages/charts/funnelCharts/FunnelChartParent"
import LineChartMasterParent from "./pages/charts/lineCharts/LineChartMasterParent"
import PieChartMasterParent from "./pages/charts/pieCharts/PieChartMasterParent"
import ColumnChartMasterParent from "./pages/charts/columnCharts/ColumnChartMasterParent"
import DraggableLineChartParent from "./pages/charts/lineCharts/DraggableLineChartParent"
import RangeSliderParent from "./pages/charts/lineCharts/RangeSliderParent"
import MinorGridLinesParent from "./pages/charts/lineCharts/MinorGridLinesParent"
import VarRadiusPieChartParent from "./pages/charts/pieCharts/VarRadiusPieChartParent"
import DraggingPieSlicesParent from "./pages/charts/pieCharts/DraggingPieSlicesParent"
import SemiPieChartParent from "./pages/charts/pieCharts/SemiPieChartParent"
import RadialGradientPieChartParent from "./pages/charts/pieCharts/RadialGradientPieChartParent"
import DonutPieChartParent from "./pages/charts/pieCharts/DonutPieChartParent"
import SimpleColumnChartParent from "./pages/charts/columnCharts/SimpleColumnChartParent"
import StackedColumnChartParent from "./pages/charts/columnCharts/StackedColumnChartParent"
import ColumnChartGrainyGradientParent from "./pages/charts/columnCharts/ColumnChartGrainyGradientParent"
import ColumnChartCurvedParent from "./pages/charts/columnCharts/ColumnChartCurvedParent"
import ColumnChartLollipopParent from "./pages/charts/columnCharts/ColumnChartLollipopParent"
import ColumnChartVarianceParent from "./pages/charts/columnCharts/ColumnChartVarianceParent"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/column-charts'>
          <Route index element={<ColumnChartsPage />} />
          <Route path='master' element={<ColumnChartMasterParent />} />
          <Route path='date' element={<SimpleColumnChartParent />} />
          <Route path='rotated-labels' element={<RotatedLabelChartParent />} />
          <Route path='clustered' element={<ClusteredChartParent />} />
          <Route path='stacked' element={<StackedColumnChartParent />} />
          <Route
            path='grainy-gradient'
            element={<ColumnChartGrainyGradientParent />}
          />
          <Route path='curved-column' element={<ColumnChartCurvedParent />} />
          <Route
            path='lollipop-chart'
            element={<ColumnChartLollipopParent />}
          />
          <Route
            path='variance-indicator'
            element={<ColumnChartVarianceParent />}
          />
        </Route>
        <Route path='/line-charts'>
          <Route index element={<LineChartsPage />} />
          <Route path='master' element={<LineChartMasterParent />} />
          <Route
            path='line-chart-target'
            element={<LineChartWithTargetParent />}
          />

          <Route
            path='minimal-multiple-line-chart'
            element={<MinimalMultipleLineChartParent />}
          />
          <Route
            path='multiple-line-chart'
            element={<MultipleLineChartParent />}
          />
          <Route
            path='draggable-line-chart'
            element={<DraggableLineChartParent />}
          />
          <Route path='range-slider' element={<RangeSliderParent />} />
          <Route path='minor-grid-lines' element={<MinorGridLinesParent />} />
        </Route>
        <Route path='/pie-charts'>
          <Route index element={<PieChartsPage />} />
          <Route path='master' element={<PieChartMasterParent />} />
          <Route path='simple' element={<CropProtectionSalesPieChart />} />
          <Route path='donut' element={<DonutPieChartParent />} />
          <Route path='grainy' element={<GrainyPieChartParent />} />
          <Route path='var-radius' element={<VarRadiusPieChartParent />} />
          <Route
            path='draggable-slices'
            element={<DraggingPieSlicesParent />}
          />
          <Route path='semi' element={<SemiPieChartParent />} />
          <Route
            path='radial-gradient'
            element={<RadialGradientPieChartParent />}
          />
        </Route>
        <Route path='/gauge-charts'>
          <Route index element={<GaugeChartsPage />} />
          <Route path='yes-or-no' element={<YesOrNoGaugeChartParent />} />
        </Route>
        <Route path='/misc-charts'>
          <Route index element={<MiscChartsPage />} />
          <Route path='word-cloud' element={<WorldCloudParent />} />
        </Route>
        <Route path='/funnel-charts'>
          <Route index element={<FunnelChartsPage />} />
          <Route path='funnel-chart' element={<FunnelChartParent />} />
        </Route>
        {/* <Route path='/test' element={<PieChartMasterParent />} /> */}
        {/* <Route path='/test2' element={<IndiaMap />} /> */}
      </Routes>
    </Router>
  )
}

export default App
