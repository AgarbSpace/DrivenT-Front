import styled from "styled-components";

export const Container = styled.form`
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

export const ListPayments = styled.ul`
  display: flex;
  margin: 0.8rem 0;
`;

export const ListPaymentItems = styled.li`
    cursor: pointer;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    align-items: center;
    border: 0.15rem solid ${props => props.selected ? "#FA4098" : "#efefef"};
    padding: 0.6rem 1rem; 
    border-radius:0.5rem;
    margin: 0.5rem;
    
    > img {
        width: 30px;
        margin-right: 5px;
    }
`;
export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaymentInfosForm = styled.div`
  padding: 0 0.5rem;
  margin: 0.6rem 0;
`;
