import React, { useState } from 'react';
import Button from '../../../components/Form/Button'
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import useApi from "../../../hooks/useApi";

import { BedroomItem, HotelList, Container, HotelListItem, BedroomContainer, BedroomDetails } from '../../../components/Hotel'
import { useRef } from 'react';
import { useEffect } from 'react';

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
  const [selectedBedroom, setSelectedBedroom] = useState({

  })

  const [hotels, setHotels] = useState([])
  const [bedrooms, setBedrooms] = useState([])

  const api = useApi()
  const carouselRef = useRef(null)

  useEffect(() => {
    api.hotel.getHotels().then(response => {
      setHotels(response.data)
    })
  }, [])

  useEffect(() => {
    if(selectedHotel){
      api.hotel.getHotelBedrooms(selectedHotel).then(response => {
        setBedrooms(response.data)
      })
    }
  }, [selectedHotel])

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
  
  const handleSelectBedroom = (bedroom) => {
    if(bedroom.vacancies !== 0){
      setSelectedBedroom(bedroom)
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
              <img alt={hotel.name} src={hotel.picture} />
              <div>
                <span>Endereço</span>
                <p>{hotel.address}</p>
              </div>
              <div>
                <span>Quartos disponíveis</span>
                <p>{hotel.availableRooms}</p>
              </div>
            </HotelListItem>
          ))}
        </HotelList>
        <ButtonRight onClick={handleRight}>
          <FaChevronRight />
        </ButtonRight>
      </div>
      
      {(bedrooms.length !== 0) && (
        <BedroomContainer>
          <h2>Quartos disponíveis nesse hotel</h2>
          <div>
            <ul>
              {bedrooms.map(bedroom => (
                <BedroomItem 
                  selected={selectedBedroom.id === bedroom.id} 
                  onClick={() => handleSelectBedroom(bedroom)}>
                    {bedroom.number}
                  </BedroomItem>
              ))}
            </ul>
            
            {selectedBedroom.id && (
              <BedroomDetails>
                <img src={selectedBedroom.picture} alt={`Imagem do quarto ${selectedBedroom.number}`} />
                <div>
                  <div>
                    <span>Numero do Quarto</span>
                    <p>{selectedBedroom.number}</p>
                  </div>
                  <div>
                    <span>Capacidade</span>
                    <p>{selectedBedroom.capacity}</p>
                  </div>
                  <div>
                    <span>Vagas</span>
                    <p>{selectedBedroom.vacancies}</p>
                  </div>
                </div>
              </BedroomDetails>
            )}
          </div>
        </BedroomContainer>
      )}
      
      <Button type='submit' color='primary' fullWidth>
        Próximo
      </Button>
    </Container>
  );
}