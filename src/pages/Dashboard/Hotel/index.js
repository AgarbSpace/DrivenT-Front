import { useEffect, useState } from 'react';
import Select from '../../../components/Form/Select'
import Button from '../../../components/Form/Button'
import Input from '../../../components/Form/Input'

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
]

export default function Hotel() {

  const [formatedHotels, setFormatedHotels] = useState([])
  const [selectedHotel, setSelectedHotel] = useState({})

  useEffect(() => {
    handleHotels()
  }, [])
  
  const handleHotels = () => {
    const formatedHotelsValues = hotels.map(hotel => ({ label: hotel.name, value: hotel.id }))
    setFormatedHotels(formatedHotelsValues)
  }

  const handleSelectHotelsValue = (e) => {
    setSelectedHotel(e.target.value)
  }

  return (
    <div>
      <h2>Hoteis disponíveis</h2>

      <form>
        <Select 
          placeholder='Selecione um hotel'
          fullWidth
          variant="outlined"
          options={formatedHotels}
          onChange={handleSelectHotelsValue}
        />

        Quantidade de quartos disponíveis: 
        <Input label="Quantos quartos você usuará?" type="number" fullWidth />

        <Button type='submit' color='primary' fullWidth>
          Próximo
        </Button>
      </form>
    </div>
  );
}