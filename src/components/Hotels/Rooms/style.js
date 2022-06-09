import styled from 'styled-components';

const Text = styled.h3`
  color: #8E8E8E;
  font-family: 'Roboto';
  font-size: 20px;

  padding-bottom: 16px;
`;

const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;

  padding-bottom: 45px;
`;

const RoomContainer = styled.div`
  height: 45px;
  width: 190px;

  border-radius: 10px;
  padding: 0 10px;
  border: 1px solid #CECECE;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${props => props.occupied && 'background-color: #E9E9E9;'};
  ${props => props.occupied && 'color: #8C8C8C;'};
  ${props => props.selected && 'background-color: #FFEED2;'};
`;

const RoomNumber = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: ${props => props.occupied ? '#9D9D9D' : '#454545'};
`;

const BedSelection = styled.button`
  all: unset;

  ${props => props.selected && 'color: #FF4791;'};
  pointer-events: ${props => props.occupied ? 'none' : 'inherit'};
  cursor: ${props => props.occupied ? 'not-allowed' : 'pointer'};
`;

const SubmitButton = styled.button`
  width: 250px;
  height: 37px;

  background-color: #E0E0E0;
  border-radius: 4px;
  border: none;

  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  text-transform: uppercase;

  :hover{
    background-color: #898989;
    cursor: pointer;
  }
`;

export {
  BedSelection,
  RoomContainer,
  RoomsContainer,
  RoomNumber,
  SubmitButton,
  Text
};
