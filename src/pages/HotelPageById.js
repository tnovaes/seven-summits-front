import styled from "styled-components";
import Header from "../components/Header.js";
import { useContext } from "react";
import TravelContext from "../context/TravelContext.js";
import { Link } from "react-router-dom";

export default function HotelPageById() {
    const { hotelInfo, summit } = useContext(TravelContext);

    return (
        <PageContainer>
            <Header></Header>
            <Back>
                <CustomLink to={`/hotels/${summit}`}>
                    <h1>Voltar</h1>
                </CustomLink>
            </Back>
            <ContentContainer>
                <Title>{hotelInfo.name}</Title>
                <HotelContainer>
                    <PhotosContainer>
                        {hotelInfo.photos.map(hp =>
                            <PhotoBox src={hp}></PhotoBox>
                        )}
                    </PhotosContainer>
                    <HotelInfoContainer>
                        <HotelInfo>
                            <h1>Characteristics:</h1>
                            <ul>
                                <li><span>Address:</span> {hotelInfo.address}</li>
                                <li><span>Price:</span> $ {hotelInfo.price}</li>
                                <li><span>Description:</span></li>
                                <p>{hotelInfo.description}</p>
                            </ul>
                        </HotelInfo>
                        <HotelInfo>
                            <h1>Amenities:</h1>
                            <AmenitiesList>
                                {hotelInfo.amenities.map(ha =>
                                    <li>{ha}</li>
                                )}
                            </AmenitiesList>
                        </HotelInfo>
                    </HotelInfoContainer>
                </HotelContainer>
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
    margin-top: 45px;
    align-items: center;
`

const Title = styled.h1`
    margin-top: 60px;
    font-size: 40px;
`

const HotelContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`

const PhotosContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 250px;
    border: 2px solid;
    margin-top: 45px;
    gap:40px;
`

const PhotoBox = styled.img`
    width:200px;
    height:200px;
`

const HotelInfoContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    margin-top: 50px;
`

const HotelInfo = styled.div`
    display:flex;
    flex-direction: column;
    font-size: 20px;
    border: 2px solid;
    width: 400px;
    height: 400px;
    padding: 20px;
    h1{
        font-weight: bold;
    }
    ul{
        margin-top: 30px;
        li{
            margin-top: 10px;
            span{
                font-weight: 700;
            }
        }
        p{
            margin-top:10px;
            }
    }
`

const AmenitiesList = styled.ul`
    margin-left: 10px;
    list-style-type: disc;
`