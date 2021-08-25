import { useState } from 'react';
import Button from '../../../components/Form/Button'
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { HotelList, Container, HotelListItem } from '../../../components/Hotel'
import { useRef } from 'react';

const hotels = [
  {
    id: 1, 
    name: 'Tangara', 
    address: '', 
    rooms: 3,
    image: 'http://s2.glbimg.com/RoHVrdIQ8gU7WT3AzNepGyJpxL8=/620x455/e.glbimg.com/og/ed/f/original/2017/06/22/hotel_palacio_tangara_exterior__8966.jpg'
  },
  {
    id: 2, 
    name: 'Tangara 2', 
    rooms: 5,
    address: '',  
    image: 'http://s2.glbimg.com/RoHVrdIQ8gU7WT3AzNepGyJpxL8=/620x455/e.glbimg.com/og/ed/f/original/2017/06/22/hotel_palacio_tangara_exterior__8966.jpg'
  },
  {
    id: 3, 
    name: 'Tangara 3 Delux Edition', 
    rooms: 1,
    address: '',  
    image: 'http://s2.glbimg.com/RoHVrdIQ8gU7WT3AzNepGyJpxL8=/620x455/e.glbimg.com/og/ed/f/original/2017/06/22/hotel_palacio_tangara_exterior__8966.jpg'
  },
  {
    id: 3, 
    name: 'Tangara 3 Delux Edition', 
    rooms: 1,
    address: '',  
    image: 'http://s2.glbimg.com/RoHVrdIQ8gU7WT3AzNepGyJpxL8=/620x455/e.glbimg.com/og/ed/f/original/2017/06/22/hotel_palacio_tangara_exterior__8966.jpg'
  },
]

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

const ButtonRight = styled(CarouselButton)`
  right: 0px;
  transform: translate(50%, -50%);
`

const ButtonLeft = styled(CarouselButton)`
  transform: translate(-50%, -50%);
`

export default function Hotel() {
  const [selectedHotel, setSelectedHotel] = useState()

  const carouselRef = useRef(null)

  const handleRight = () => {
    const carousel = carouselRef.current
    if(carousel){
      carousel.scrollLeft += carousel.offsetWidth
    }
  }

  const handleLeft = () => {
    const carousel = carouselRef.current
    if(carousel){
      carousel.scrollLeft -= carousel.offsetWidth
    }
  }
  
  return (
    <Container>
      <h1>Hoteis disponíveis</h1>

      <div style={{ position: 'relative' }}>
        <ButtonLeft onClick={handleLeft}>
          <FaChevronLeft />
        </ButtonLeft>
        <HotelList ref={carouselRef}>  
          {hotels.map(hotel => (
            <HotelListItem
              key={hotel.id}
              selected={selectedHotel === hotel.id} 
              onClick={() => setSelectedHotel(hotel.id)}
            >
              <h2>{hotel.name}</h2>
              <img alt={hotel.name} src={hotel.image} />
              <div>
                <span>Endereço</span>
                <p>Estrada dos Mirandas</p>
              </div>
            </HotelListItem>
          ))}
        </HotelList>
        <ButtonRight onClick={handleRight}>
          <FaChevronRight />
        </ButtonRight>
      </div>
      
      <div>
        <h2>Quartos nesse hotel</h2>
        <div>
          Numero do Quarto
          Foto
          Capacity
          Vagas
        </div>
      </div>
        {/* <Button type='submit' color='primary' fullWidth>
          Próximo
        </Button> */}
    </Container>
  );
}