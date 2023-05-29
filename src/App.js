import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import FlightsSearchPage from "./pages/FlightsSearchPage"
import HotelsSearchPage from "./pages/HotelsSearchPage"
import FlightPageById from "./pages/FlightPageById"
import HotelPageById from "./pages/HotelPageById"
import { TravelProvider } from "./context/TravelContext.js"




export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <TravelProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flights/:id" element={<FlightsSearchPage />} />
            <Route path="/hotels/:id" element={<HotelsSearchPage />} />
            <Route path="/flights/id/:id" element={<FlightPageById />} />
            <Route path="/hotels/id/:id" element={<HotelPageById />} />
          </Routes>
        </TravelProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #ffffff;
  max-width:100vw;
  max-height: 100vh;
`