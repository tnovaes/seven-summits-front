import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Container>
            <CustomLink to="/">
                <h1>Seven Summits</h1>
            </CustomLink>
        </Container>
    )
}

const Container = styled.header`
    display:flex;
    align-items: center;
    justify-content: left;
    padding-left: 30px;
    width:100%;
    height: 60px;
    border: 2px solid;
    position: fixed;
    z-index:2;
    background-color: white;
    h1{
        font-size: 23px;
        font-weight: 700px;
        color:black;
        
    }

`

const CustomLink = styled(Link)`
  text-decoration: none;
`;
