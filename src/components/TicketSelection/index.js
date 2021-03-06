import {
  Flex,
  Text,
  SelectionButton,
  SubmitButton
} from './styles';

export default function TicketSelection({
  ticketModality,
  setTicketModality,
  includeHotel,
  setIncludeHotel,
  total,
  setTotal,
  setBookTicket
}) {
  function handleTicketSelection(ticket) {
    setTicketModality(ticket);

    if (ticket === 'Online') setTotal(100);
    else setTotal(250);
  }

  function handleHotelSelection(hotel) {
    setIncludeHotel(hotel);

    if (hotel === 'yes') setTotal(600);
    else setTotal(250);
  }

  function handleSubmit() {
    setBookTicket(true);
  }

  return (
    <>
      <Text>Primeiro, escolha sua modalidade de ingresso</Text>
      <Flex>
        <SelectionButton
          selected={ticketModality === 'Presencial'}
          onClick={() => handleTicketSelection('Presencial')}
        >
          Presencial <span>R$ 250</span>
        </SelectionButton>

        <SelectionButton
          selected={ticketModality === 'Online'}
          onClick={() => handleTicketSelection('Online')}
        >
          Online <span>R$ 100</span>
        </SelectionButton>
      </Flex>

      {ticketModality === 'Presencial' &&
        <>
          <Text>Ótimo! Agora escolha sua modalidade de hospedagem</Text>

          <Flex>
            <SelectionButton
              selected={includeHotel === 'no'}
              onClick={() => handleHotelSelection('no')}
            >
              Sem hotel <span>+ R$ 0</span>
            </SelectionButton>

            <SelectionButton
              selected={includeHotel === 'yes'}
              onClick={() => handleHotelSelection('yes')}
            >
              Com hotel <span>+ R$ 350</span>
            </SelectionButton>
          </Flex>
        </>
      }

      {(includeHotel !== '' || ticketModality === 'Online') &&
        <>
          <Text>Fechado! O total ficou em R$ {total}. Agora é só confirmar: </Text>
          <SubmitButton onClick={handleSubmit}>reservar ingresso</SubmitButton>
        </>
      }
    </>
  );
}
