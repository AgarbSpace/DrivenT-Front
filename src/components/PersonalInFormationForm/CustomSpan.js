import styled from "styled-components";

export const CustomSpan = styled.span`
display: flex;
align-items: center;
width: 100%;
margin-top: 8px;
> button {
  margin-top: 0 !important;
}

@media (max-width: 600px) {
  justify-content: space-between;
}
`;
