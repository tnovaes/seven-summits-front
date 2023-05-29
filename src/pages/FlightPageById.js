import styled from "styled-components";
import Header from "../components/Header.js";
import { useContext } from "react";
import TravelContext from "../context/TravelContext.js";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function FlightPageById() {
    const { flightInfo, summit } = useContext(TravelContext);

    console.log(summit);

    return (
        <PageContainer>
            <Header></Header>
            <Back>
                <CustomLink to={`/flights/${summit}`}>
                    <h1>Voltar</h1>
                </CustomLink>
            </Back>
            <ContentContainer>
                <Title>Flight to {summit}</Title>
                <FlightInfo>
                    <p>Destination: {flightInfo.destination}</p>
                    <p>Origin: {flightInfo.origin}</p>
                    <p>Airline company: {flightInfo.airline}</p>
                    <p>Depart time: {dayjs(flightInfo.depart).format("HH:mm:ss (DD-MM-YYYY)")}</p>
                    <p>Arrival time: {dayjs(flightInfo.arrival).format("HH:mm:ss (DD-MM-YYYY)")}</p>
                    <p>Price: ${flightInfo.price}</p>
                </FlightInfo>
            </ContentContainer>
        </PageContainer >
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction:column;
`

const Back = styled.div`
    width: 200px;
    position: fixed;
    z-index: 3;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-left: calc(85%);
    text-align: center;
    font-size: 20px; 
    
`

const CustomLink = styled(Link)`
  text-decoration: none;
  color:black;
`;

const ContentContainer = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 60px;
    align-items: center;
`

const Title = styled.h1`
    margin-top: 60px;
    font-size: 40px;
`

const FlightInfo = styled.div`
    display:flex;
    flex-direction: column;
    width: 800px;
    margin-top: 120px;
    font-size: 24px;
    p{
        margin-bottom:25px;
    }
`