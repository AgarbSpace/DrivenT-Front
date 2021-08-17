import Loader from "react-loader-spinner";
import styled from "styled-components";

import Page from "./Page";

import driventLogo from "../assets/images/drivent.png";

export default function Loading() {
  return (
    <StyledPage background="#FA4098">
      <StyledLoader color="#FFFFFF" height={26} width={26} type="Oval" />
      <img src={driventLogo} alt="Driven.t" />
    </StyledPage>
  );
}

const StyledPage = styled(Page)`
  color: white;
  flex-direction: row;

  user-select: none;

  & > *:not(:last-child) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;
