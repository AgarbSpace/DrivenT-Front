import { useState, useRef, useEffect } from "react";

import { useHistory } from "react-router-dom";
import Button from "../../../components/Form/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";

import { 
  BedroomItem, 
  HotelList, 
  Container, 
  HotelListItem, 
  BedroomContainer, 
  BedroomDetails, 
  ButtonRight, 
  ButtonLeft,
  ContainerRoomShimmer,
  LineShimmer,
  ImageShimmer,
  ContainerHotelShimmer
} from "../../../components/Hotel";

import Shimmer from "react-shimmer-effect";

export default function Hotel() {
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedBedroom, setSelectedBedroom] = useState({});

  const [hotels, setHotels] = useState([]);
  const [isLoadingHotel, setIsHotelLoading] = useState(false);

  const [bedrooms, setBedrooms] = useState([]);
  const [isLoadingBedrooms, setIsLoadingBedrooms] = useState(false);

  const [isLoadingRendBedboom, setIsLoadingRendBedboom] = useState(false);
  
  const history = useHistory();
  const api = useApi();
  const carouselRef = useRef(null);

  useEffect(() => {
    setIsHotelLoading(true);
    api.hotel.getHotels()
      .then(response => {
        setHotels(response.data);
      })
      .catch(err => {
        toast("Tivemos um erro ao carregar os hoteis");
      })
      .finally(() => setIsHotelLoading(false));
  }, []);

  useEffect(() => {
    if(selectedHotel) {
      setIsLoadingBedrooms(true);
      
      api.hotel.getHotelBedrooms(selectedHotel).then(response => {
        setBedrooms(response.data);
      })
        .catch(() => toast("Tivemos um erro ao carregar os quartos desse hotel"))
        .finally(() => setIsLoadingBedrooms(false));
    }
  }, [selectedHotel]);

  const handleRight = () => {
    const carousel = carouselRef.current;
    if(carousel) {
      carousel.scrollLeft += carousel.offsetWidth;
    }
  };

  const handleLeft = () => {
    const carousel = carouselRef.current;
    if(carousel) {
      carousel.scrollLeft -= carousel.offsetWidth;
    }
  };
  
  const handleSelectBedroom = (bedroom) => {
    if(bedroom.vacancies !== 0) {
      setSelectedBedroom(bedroom);
    }
  };

  const handleRentAccommodation = async() => {
    try{
      setIsLoadingRendBedboom(true);
      await api.hotel.rentAccommodation(selectedHotel, selectedBedroom.id);
      toast("Quarto reservado com sucesso!");
      history.push("/activities");
    }catch(err) {
      toast("Ops! Tivemos um erro ao reversar seu quarto");
    }finally{ 
      setIsLoadingRendBedboom(false);
    }
  };

  return (
    <Container>
      <h1>Hoteis disponíveis</h1>

      <div>
        <ButtonLeft onClick={handleLeft}>
          <FaChevronLeft />
        </ButtonLeft>
        <HotelList ref={carouselRef}> 
          {isLoadingHotel ? Array.from({ length: 4 }, (_, index) => (
            <ContainerHotelShimmer key={index}>
              <Shimmer>
                <ImageShimmer />
                <LineShimmer />
              </Shimmer>
            </ContainerHotelShimmer>
          )) : hotels.map(hotel => (
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
      
      {(bedrooms.length !== 0 || isLoadingBedrooms) && (
        <BedroomContainer>
          <h2>Quartos disponíveis nesse hotel</h2>
          <div>
            <ul>
              {isLoadingBedrooms ? 
                Array.from({ length: 5 }, (_, index) => <ContainerRoomShimmer key={index}/>)
                :
                bedrooms.map(bedroom => (
                  <BedroomItem 
                    selected={selectedBedroom.id === bedroom.id} 
                    onClick={() => handleSelectBedroom(bedroom)}>
                    {bedroom.number}
                  </BedroomItem>
                ))
              }
            </ul>
            
            {selectedBedroom.id && (
              <BedroomDetails>
                <img src={selectedBedroom.picture} alt={`Imagem do quarto ${selectedBedroom.number}`} />
                <div>
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
                  <Button onClick={handleRentAccommodation} type='button' color='primary' fullWidth>
                    Reservar Hotel e Quarto
                  </Button>
                </div>
              </BedroomDetails>
            )}
          </div>
        </BedroomContainer>
      )}
    </Container>
  );
}
