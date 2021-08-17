import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

export default function Input({ variant="outlined", ...props }) {
  return (
    <StyledTextField variant={variant} {...props} />
  );
}

const StyledTextField = styled(TextField)`
  margin-top: 8px !important;
`;
