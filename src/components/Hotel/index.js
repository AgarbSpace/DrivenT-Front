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

export const BedroomContainer = styled.div`
    > h2{
        margin: 1.5rem 0;
    }

    > div {
        display: flex;

        > ul {
            width: 40%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
        }
    }
`

export const BedroomItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    
    width: 3rem;
    height: 3rem;
    margin: 0.2rem;
    border: 0.2rem solid;

    ${props => props.selected ? 
        css`border-color: #FA4098;` : 
        css`border-color: rgba(0, 0, 0, 0.15);`
    }
                
    &:hover{
        cursor: pointer;
    }
`

export const BedroomDetails = styled.div`
    padding: 0 2rem;
    display: flex;

    > img {
        width: 55%;
        border-radius: 10px;
    }

    >div{
        padding: 0 1.2rem;
        > div{
            margin-bottom: 1rem;
    
            >span{
                font-size: 10pt;
            }
        }
    }
`

const CarouselButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  z-index: 9999;

  border: none;
  background-color: #FA4098;
  
  &:hover{
    cursor: pointer;
    background-color: #fb1783;
  }

  > svg{
    color: #fff;
  }
`

export const ButtonRight = styled(CarouselButton)`
  right: 0px;
  transform: translate(50%, -50%);
`

export const ButtonLeft = styled(CarouselButton)`
  transform: translate(-50%, -50%);
`
