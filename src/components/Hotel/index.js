import styled, {css} from "styled-components";

export const Container = styled.div`
    >h1{
        margin-bottom: 1.5rem;
    }
`

export const HotelList = styled.ul`
    display: flex;
    overflow-x: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    position: relative;
`


export const HotelListItem = styled.li`
    scroll-snap-align: center;


    min-width: 15rem;
    width: 15rem;
    display: flex;
    flex-direction: column;
    
    &:hover{
        cursor: pointer;
    }

    border: 2.4px solid;
    ${props => props.selected ? 
        css`border-color: #FA4098;` : 
        css`border-color: rgba(0, 0, 0, 0.15);`
    }
    padding: 1rem;
    border-radius: 0.3rem; 
    margin: 0.2rem;

    >div{
        >span{
            font-size: 8pt;
        }
    }
    > img {
        width: 100%;
        margin: 0.8rem 0;
        border-radius: 5px;
    } 
`