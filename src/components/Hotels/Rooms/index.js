import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';
import useHotel from '../../../hooks/api/useHotel';
import Splash from '../../Splash';

import {
  BedSelection,
  RoomContainer,
  RoomsContainer,
  RoomNumber,
  SubmitButton,
  Text
} from './style';

export default function Rooms() {
  const { hotels, hotelsLoading } = useHotel();
  const [selectedRoom, setSelectedRoom] = useState(false);
  let rooms = [];

  if (hotels) {
    rooms = hotels[0].Room;
  };

  if (hotelsLoading) return <Splash loading />;

  console.log(rooms);
  return (
    <>
      <Text>Ótima pedida! Agora escolha seu quarto</Text>
      <RoomsContainer>
        {rooms.map(room =>
          <Room
            key={room.id}
            room={room}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        )}
      </RoomsContainer>

      {selectedRoom && <SubmitButton>Reservar quarto</SubmitButton>}
    </>
  );
};

function Room({ room, selectedRoom, setSelectedRoom }) {
  const beds = room.Beds;

  const teste = beds.filter(bed => !bed.occupied);
  console.log(teste);
  //console.log(beds);

  return (
    <RoomContainer occupied={teste.length === 0} selected={false}>
      <RoomNumber occupied={false}>{room.number}</RoomNumber>
      <div>
        {beds.map(bed =>
          <Bed key={bed.id} bed={bed} />
        )}
      </div>

    </RoomContainer>
  );
};

function Bed({ bed }) {
  const [selectedBed, setSelectedBed] = useState(false);

  return (
    <BedSelection
      selected={selectedBed}
      onClick={() => setSelectedBed(!selectedBed)}
    >
      {bed.occupied ?
        <PersonIcon />
        :
        <PersonOutlineIcon />
      }
    </BedSelection>
  );
};

