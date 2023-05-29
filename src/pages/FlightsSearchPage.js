import styled from "styled-components";
import Header from "../components/Header.js";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import TravelContext from "../context/TravelContext.js";
import apiFlights from "../services/apiFlights.js";
import { useNavigate } from "react-router-dom";

export default function FlightsSearchPage() {
    const { flights, summit, setFlightInfo } = useContext(TravelContext);
    const [minimum, setMinimum] = useState(0);
    const [maximum, setMaximum] = useState(Infinity);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const maxPrice = flights.reduce((max, flight) => (flight.price > max ? flight.price : max), 0);
        setMaxPrice(maxPrice);
        setMaximum(maxPrice);
    }, [flights]);

    useEffect(() => {
        const updatedFlights = flights.filter((f) => f.price >= minimum && f.price <= maximum);
        setFilteredFlights(updatedFlights);
    }, [flights, minimum, maximum]);

    function handleMinimumChange(event) {
        setMinimum(Number(event.target.value));
    }

    function handleMaximumChange(event) {
        setMaximum(Number(event.target.value));
    }

    function handleFlightClick(id) {
        apiFlights.getFlightById(id)
            .then(res => {
                const flightInfo = res.data;
                console.log(res);
                setFlightInfo(flightInfo);
                navigate(`/flights/id/${id}`);
            })
    }

    function renderValueMarks() {
        const marks = [];
        const step = 300;
        for (let i = 0; i <= maxPrice; i += step) {
            marks.push(
                <ValueMark key={i} style={{ left: `${(i / maxPrice) * 100}%` }}>
                    {i}
                </ValueMark>
            );
        }
        return marks;
    }

    return (
        <PageContainer>
            <Header></Header>
            <ContentContainer>
                <FilterContainer>
                    <Filter>
                        <h1>Preço Mínimo</h1>
                        <FilterInput type="range" min="0" max={maxPrice} step="100" value={minimum} onChange={handleMinimumChange}></FilterInput>
                        <FilterValues>
                            {renderValueMarks()}
                        </FilterValues>
                    </Filter>
                    <Filter>
                        <h1>Preço Máximo</h1>
                        <FilterInput type="range" min="0" max={maxPrice} step="100" value={maximum} onChange={handleMaximumChange}></FilterInput>
                        <FilterValues>
                            {renderValueMarks()}
                        </FilterValues>
                    </Filter>
                </FilterContainer>
                <SearchContainer>
                    <Title>Flights to {summit}</Title>
                    <SearchOptionsContainer>
                        {filteredFlights.length === 0 ? <NoOptions>No flights found</NoOptions> :
                            (filteredFlights.map((f) =>
                                <OptionContainer key={f.id} onClick={() => handleFlightClick(f.id)}>
                                    <ImageBox src="https://img.freepik.com/fotos-gratis/asa-do-aviao-de-passagem-acima-da-vista-da-terra-de-dentro_93675-132880.jpg"></ImageBox>
                                    <p>{dayjs(f.depart).format("DD-MM-YYYY")}</p>
                                    <p>{dayjs(f.depart).format("HH:mm:ss")}</p>
                                    <p>$ {f.price}</p>
                                    <p>{f.origin}</p>
                                </OptionContainer>
                            ))}
                    </SearchOptionsContainer>
                </SearchContainer>
            </ContentContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction:column;
`

const ContentContainer = styled.div`
    display:flex;
    margin-top: 60px;

`

const FilterContainer = styled.div`
    display:flex;
    flex-direction:column;
    width: 300px;
    height:94vh;
    border-right:2px solid;
    border-left:2px solid;
    gap: 10px;
`

const Filter = styled.div`
    display:flex;
    width: 400px;
    height:100px;
    flex-direction: column;
    padding: 20px;
    font-size:18px;
    justify-content: space-between;
`

const FilterInput = styled.input`
    width:250px;
    margin-top: 20px;
    margin-bottom: 10px;

    &::-webkit-slider-runnable-track {
    background-color:white;
    width: 100%;
    height: 8px;
    border: 1px solid black;
    border-radius: 4px;
  }
  &::-webkit-slider-thumb {
    background-color: black;
    position:relative;
    top:-5px;
  }
`

const FilterValues = styled.div`
    display:flex;
    width: 250px;
`

const ValueMark = styled.span`
  transform: translateX(-50%);
  width:50px;
  font-size: 12px;
  color: #000000;
  text-align: center;
  padding-left:20px;
`;

const SearchContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    margin-top: 60px;
    font-size: 40px;
`

const SearchOptionsContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap:70px;
`

const NoOptions = styled.h1`
    font-size: 25px;
    margin-top: 50px;
`

const OptionContainer = styled.div`
    width: 300px;
    height:500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    font-size: 20px;
`

const ImageBox = styled.img`
    width: 300px;
    height: 300px;
`

