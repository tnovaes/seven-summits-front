import styled from "styled-components";
import Header from "../components/Header.js";
import { useContext, useEffect, useState } from "react";
import TravelContext from "../context/TravelContext.js";
import { useNavigate } from "react-router-dom";
import apiHotels from "../services/apiHotels.js";

export default function HotelsSearchPage() {
    const { hotels, summit, setHotelInfo } = useContext(TravelContext);
    const [minimum, setMinimum] = useState(0);
    const [maximum, setMaximum] = useState(Infinity);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const maxPrice = hotels.reduce((max, hotel) => (hotel.price > max ? hotel.price : max), 0);
        setMaxPrice(maxPrice);
        setMaximum(maxPrice);
    }, [hotels]);

    useEffect(() => {
        const updatedHotels = hotels.filter((h) => h.price >= minimum && h.price <= maximum);
        setFilteredHotels(updatedHotels);
    }, [hotels, minimum, maximum]);

    function handleMinimumChange(event) {
        setMinimum(Number(event.target.value));
    }

    function handleMaximumChange(event) {
        setMaximum(Number(event.target.value));
    }

    function handleHotelClick(id) {
        apiHotels.getHotelById(id)
            .then(res => {
                const hotelInfo = res.data;
                setHotelInfo(hotelInfo);
                navigate(`/hotels/id/${id}`);
            })
    }

    function renderValueMarks() {
        const marks = [];
        const step = 30;
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
                        <FilterInput type="range" min="0" max={maxPrice} step="10" value={minimum} onChange={handleMinimumChange}></FilterInput>
                        <FilterValues>
                            {renderValueMarks()}
                        </FilterValues>
                    </Filter>
                    <Filter>
                        <h1>Preço Máximo</h1>
                        <FilterInput type="range" min="0" max={maxPrice} step="10" value={maximum} onChange={handleMaximumChange}></FilterInput>
                        <FilterValues>
                            {renderValueMarks()}
                        </FilterValues>
                    </Filter>
                </FilterContainer>
                <SearchContainer>
                    <Title>Hotels to {summit}</Title>
                    <SearchOptionsContainer>
                        {filteredHotels.length === 0 ? <NoOptions>No hotels found</NoOptions> :
                            (filteredHotels.map((h) =>
                                <OptionContainer key={h.id} onClick={() => handleHotelClick(h.id)}>
                                    <ImageBox src={h.photo}></ImageBox>
                                    <p>{h.name}</p>
                                    <p>$ {h.price}</p>
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
    width: 400px;
    height:94vh;
    border-right:2px solid;
    border-left:2px solid;
    gap: 10px;
`

const Filter = styled.div`
    display:flex;
    width: 300px;
    height:100px;
    flex-direction: column;
    padding: 20px;
    font-size:18px;
    justify-content: space-between;
`

const FilterInput = styled.input`
    width:220px;
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