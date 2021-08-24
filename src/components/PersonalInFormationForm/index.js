import { useState } from "react";
import styled from "styled-components";
import Input from "../Form/Input";
import Button from "../Form/Button";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";

import { Checkbox } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import useApi from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";

const CustomDatePicker = styled(KeyboardDatePicker)`
  margin-top: 8px !important;
  > div {
    margin-top: auto !important;
  }
  > label {
    margin-top: auto !important;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  > div {
    width: 50%;
  }

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
const InputWrapper = styled.div`
  > div {
    width: 100%;
  }
`;
const CustomSpan = styled.span`
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

const ErrorMsg = styled.p`
  color: red;
`;

export default function PersonalInformationForm() {
  function cepIsFully(cep) {
    if (cep.length < 8) {
      return false;
    } else {
      return true;
    }
  }
  const [dinamicInputIsLoading, setDinamicInputIsLoading] = useState(false);
  const api = useApi();

  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
    customHandleChange,
  } = useForm({
    validations: {
      name: {
        pattern: {
          value: "^[A-Za-z]*$",
          message: "You're not allowed to have a number in your name",
        },
      },

      cpf: {
        custom: {
          isValid: (value) =>
            parseInt(value?.length, 10) === 14 ||
            value === undefined ||
            value.length === 0,
          message: "invalid cpf, not numbers enough",
        },
      },

      phone: {
        custom: {
          isValid: (value) =>
            parseInt(value?.length, 10) === 14 ||
            value === undefined ||
            value.length === 0,
          message: "invalid phone, not numbers enough",
        },
      },
      cep: {
        custom: {
          isValid: (value) =>
            parseInt(value?.length, 10) === 9 ||
            value === undefined ||
            value.length === 0,
          message: "invalid cep, not numbers enough",
        },
      },
    },
    onSubmit: (data) => console.log(data),
    initialValues: {
      // used to initialize the data
      cpf: "",
      name: "",
      birthday: null ,
      phone: "",
      cep: "",
      street: "",
      city: "",
      number: "",
      state: "",
      neighborhood: "",
      adressDetail: "",
      isHotelGuest: false,
    },
  });
  const handleCepChanges = (e) => {
    const { name, value } = e.target;

    const valueWithoutMask = value.replace("-", "");

    if (cepIsFully(valueWithoutMask)) {
      const newDataValues = { ...data, [name]: value };

      setDinamicInputIsLoading(true);
      api.cepApi.getAddress(valueWithoutMask).then(({ data }) => {
        setDinamicInputIsLoading(false);
        setData({
          ...newDataValues,
          street: data.logradouro,
          city: data.localidade,
          neighborhood: data.bairro,
          state: data.uf,
        });
      });
    }
  };

  return (
    <>
      <Typography variant="h4">User Infos:</Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormWrapper onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              label="Full Name"
              name="name"
              type="text"
              mask=""
              value={data.name || ""}
              onChange={handleChange("name")}
            />
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              name="cpf"
              label="CPF"
              type="text"
              maxLength="14"
              mask="999.999.999-99"
              value={data.cpf || ""}
              onChange={handleChange("cpf")}
            />
            {errors.cpf && <ErrorMsg>{errors.cpf}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <CustomDatePicker
              name="birthday"
              clearable
              placeholder="10/10/2018"
              format="dd/MM/yyyy"
              label="Birthday"
              inputVariant="outlined"
              autoOk
              value={data.birthday || ""}
              onChange={(date) => {
                console.log(date);
                customHandleChange("birthday")(date);
              }}
            />
            {errors.birthday && <ErrorMsg>{errors.birthday}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Phone"
              mask="(99)99999-9999"
              name="phone"
              value={data.phone || ""}
              onChange={handleChange("phone")}
            />
            {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Cep"
              name="cep"
              mask="99999-999"
              value={data.cep || ""}
              onChange={(e) => {
                handleChange("cep")(e);
                handleCepChanges(e);
              }}
            />
            {errors.cep && <ErrorMsg>{errors.cep}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Street"
              name="street"
              value={data.street || ""}
              onChange={handleChange("street")}
              disabled={dinamicInputIsLoading}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="City"
              name="city"
              value={data.city || ""}
              onChange={handleChange("city")}
              disabled={dinamicInputIsLoading}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Number"
              name="number"
              value={data.number || ""}
              onChange={handleChange("number")}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Neighborhood"
              name="neighborhood"
              value={data.neighborhood || ""}
              onChange={handleChange("neighborhood")}
              disabled={dinamicInputIsLoading}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="AdressDetail"
              name="adressDetail"
              value={data.adressDetail || ""}
              onChange={handleChange("adressDetail")}
            />
          </InputWrapper>
          <CustomSpan>
            <span>
              book hotel
              <Checkbox
                name="isHotelGuest"
                inputProps={{ "aria-label": "primary checkbox" }}
                value={data.isHotelGuest || ""}
                onChange={(e) =>
                  customHandleChange("isHotelGuest")(e.target.checked)
                }
              />
            </span>
            <Button type="submit" disabled={dinamicInputIsLoading}>
              Salvar
            </Button>
          </CustomSpan>
        </FormWrapper>
      </MuiPickersUtilsProvider>
    </>
  );
}
