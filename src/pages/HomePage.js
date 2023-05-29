import styled from "styled-components";
import Header from "../components/Header.js";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiHotels from "../services/apiHotels.js";
import apiFlights from "../services/apiFlights.js";
import TravelContext from "../context/TravelContext.js";

export default function HomePage() {
    const [selectedSummit, setSelectedSummit] = useState("Choose one of the seven summits");
    const { setFlights, setHotels, setSummit } = useContext(TravelContext);
    const navigate = useNavigate();

    function handleSelectChange(event) {
        setSelectedSummit(event.target.value);
        setSummit(event.target.value);
    };

    function handleFlightsClick() {
        if (selectedSummit && selectedSummit !== "Choose one of the seven summits") {
            getFlights(selectedSummit);
        }
    };

    function handleHotelsClick() {
        if (selectedSummit && selectedSummit !== "Choose one of the seven summits") {
            getHotels(selectedSummit);
        }
    };

    function getFlights(summit) {
        apiFlights.getFlightsBySummit(summit)
            .then(res => {
                const listFlights = res.data;
                setFlights(listFlights);
                navigate(`/flights/${summit}`);
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }

    function getHotels(summit) {
        apiHotels.getHotelsBySummit(summit)
            .then(res => {
                const apiHotel = res.data;
                setHotels(apiHotel);
                navigate(`/hotels/${summit}`);
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }

    return (
        <HomeContainer>
            <Header></Header>
            <ContentContainer>
                <Title>Plan your perfect trip to visit the highest places on Earth.</Title>
                <DestinationInput>
                    <select value={selectedSummit} onChange={handleSelectChange}>
                        <option disabled hidden>Choose one of the seven summits</option>
                        <option>Kilimanjaro</option>
                        <option>Elbrus</option>
                        <option>Aconcagua</option>
                        <option>Carstensz Pyramid</option>
                        <option>Denali</option>
                        <option>Vinson Massif</option>
                        <option>Everest</option>
                    </select>
                </DestinationInput>
                <InstructionsContainer>
                    <InstructionBox onClick={handleFlightsClick}>Check the available flights with date and price</InstructionBox>
                    <InstructionBox onClick={handleHotelsClick}>Check the hotels you can stay and its amenities!</InstructionBox>
                </InstructionsContainer>
            </ContentContainer>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    display: flex;
    flex-direction:column;
`

const ContentContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h1`
    margin-top: 120px;
    font-size: 30px;
`

const DestinationInput = styled.div`
    display:flex;
    justify-content: center;
    width:733px;
    height: 60px;
    margin-top:80px;
    select{
        font-size:18px;
        padding: 10px;
        width:884px;
    }
`

const InstructionsContainer = styled.div`
    display:flex;
    width:733px;
    justify-content: space-evenly;
    margin-top: 80px;
    gap: 40px;
`

const InstructionBox = styled.div`
    width: 250px;
    height: 250px;
    padding: 8px;
    border: 1px solid;
    display:flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size:18px;
`