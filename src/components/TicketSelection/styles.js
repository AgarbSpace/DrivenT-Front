import styled from 'styled-components';

const Text = styled.h3`
  color: #8E8E8E;
  font-family: 'Roboto';
  font-size: 20px;

  padding-bottom: 16px;
`;

const Flex = styled.div`
  display: flex;
  gap: 24px;

  padding-bottom: 40px;
`;

const SelectionButton = styled.button`
  width: 145px;
  height: 145px;

  border-radius: 20px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  font-family: 'Roboto';
  color: #454545;
  font-size: 16px;
  
  cursor: pointer;
  
  border: 1px solid ${props => props.selected ? '#FFEED2' : '#CECECE'};
  background-color: ${props => props.selected ? '#FFEED2' : '#fff'};

  span{
    color: #898989;
    font-size: 14px;
  }
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
  Flex,
  Text,
  SelectionButton,
  SubmitButton
};
