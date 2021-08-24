import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import InputMask from "react-input-mask";

export default function Input({ mask = "", maskChar = "", variant = "outlined", value="", onChange = () => 0, ...props }) {
  return (mask || maskChar) ? (
    <InputMask mask={mask} maskChar={maskChar} value={value} onChange={onChange}>
      {() => <StyledTextField {...props} variant={variant} />}
    </InputMask>
  ) : (
    <StyledTextField {...props} value={value} onChange={onChange} variant={variant} />
  );
}

const StyledTextField = styled(TextField)`
  margin-top: 8px !important;
`;
