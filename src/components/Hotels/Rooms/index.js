import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';

import {
  BedSelection,
  RoomContainer,
  RoomsContainer,
  RoomNumber,
  SubmitButton,
  Text
} from './style';

export default function Rooms({ rooms }) {
  const [selectedBedId, setSelectedBedId] = useState(0);

  let selectedRoom = 0;

  rooms.forEach(room => (
    room.Beds.forEach(bed => {
      if (bed.selected) bed.selected = false;

      if (room.selected && room.id !== selectedRoom)
        room.selected = false;

      if (bed.id === selectedBedId) {
        bed.selected = true;
        room.selected = true;
        selectedRoom = bed.roomId;
      }
    })
  ));

  return (
    <>
      <Text>Ótima pedida! Agora escolha seu quarto</Text>
      <RoomsContainer>
        {rooms.map(room =>
          <Room
            key={room.id}
            room={room}
            selectedBedId={setSelectedBedId}
            selectedRoom={selectedRoom}
          />
        )}
      </RoomsContainer>

      {selectedBedId !== 0 && <SubmitButton>Reservar quarto</SubmitButton>}
    </>
  );
};

function Room({ room, selectedBedId }) {
  const occupiedRooms = room.Beds.filter(bed => !bed.occupied);

  return (
    <RoomContainer occupied={occupiedRooms.length === 0} selected={room.selected}>
      <RoomNumber occupied={false}>{room.number}</RoomNumber>
      <div>
        {room.Beds.map(bed =>
          <Bed
            key={bed.id}
            bed={bed}
            selectedBedId={selectedBedId}
          />
        )}
      </div>

    </RoomContainer>
  );
};

function Bed({ bed, selectedBedId }) {
  return (
    <BedSelection
      selected={bed.selected}
      occupied={bed.occupied}
      onClick={() => selectedBedId(bed.id)}
    >
      {(bed.occupied || bed.selected) ?
        <PersonIcon />
        :
        <PersonOutlineIcon />
      }
    </BedSelection>
  );
};

