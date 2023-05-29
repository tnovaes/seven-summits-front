import React, { createContext, useState } from "react";

const TravelContext = createContext();

export function TravelProvider({ children }) {
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [summit, setSummit] = useState("");
  const [flightInfo, setFlightInfo] = useState("");
  const [hotelInfo, setHotelInfo] = useState("");


  return (
    <TravelContext.Provider value={{ flights, setFlights, hotels, setHotels, summit, setSummit, flightInfo, setFlightInfo, hotelInfo, setHotelInfo }}>
      {children}
    </TravelContext.Provider>
  );
}

export default TravelContext;