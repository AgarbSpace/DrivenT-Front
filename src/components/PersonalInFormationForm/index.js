import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../Form/Input";
import Button from "../Form/Button";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import { Checkbox } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import useApi from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";
import UserContext from "../../contexts/UserContext";
import formatForm from "../../utils/personalFormFormater";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "../../components/Form/Select";
dayjs.extend(CustomParseFormat);

const CustomDatePicker = styled(DatePicker)`
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
  const ufList = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
  ];
  function cepIsFully(cep) {
    if (cep.length < 8) {
      return false;
    } else {
      return true;
    }
  }

  const [dinamicInputIsLoading, setDinamicInputIsLoading] = useState(false);

  const api = useApi();
  const { userData } = useContext(UserContext);

  function isValidString(value) {
    if (value == null || value.trim() === "") {
      return false;
    }
    return true;
  }

  useEffect(() => {
    api.attendeeApi
      .getAttendeePersonalInformations(userData.token)
      .then(({ data }) => {
        if (data.length === 0 || data === undefined || data === null || !data.address) {
          return;
        }
        const { name, cpf, birthday, phone, isHotelGuest, address } = data;

        setData({
          name,
          cpf,
          birthday,
          phone,
          isHotelGuest,
          cep: address.cep,
          street: address.street,
          city: address.city,
          state: address.state,
          number: address.number,
          neighborhood: address.neighborhood,
          addressDetail: address.addressDetail,
        });
      });
  }, []);

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
        custom: {
          isValid: (value) => isValidString(value),
          message: "Invalid data",
        },
      },

      cpf: {
        custom: {
          isValid: (value) => parseInt(value?.length, 10) === 14,
          message: "invalid cpf, not numbers enough",
        },
      },

      phone: {
        custom: {
          isValid: (value) => parseInt(value?.length, 10) === 14,
          message: "invalid phone, not numbers enough",
        },
      },
      cep: {
        custom: {
          isValid: (value) => parseInt(value?.length, 10) === 9,
          message: "invalid cep, not numbers enough",
        },
      },
      city: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "Invalid data",
        },
      },
      neighborhood: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "Invalid data",
        },
      },

      street: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "Invalid data",
        },
      },
      state: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "Invalid data",
        },
      },
      birthday: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "invalid data",
        },
      },
      number: {
        custom: {
          isValid: (value) => {
            if (Number(value)) {
              return true;
            }
            return false;
          },
          message: "invalid data",
        },
      },
    },
    onSubmit: (data) => {
      const newData = {
        name: data.name,
        cpf: data.cpf,
        birthday: data.birthday,
        address: {
          cep: data.cep,
          street: data.street,
          city: data.city,
          number: data.number,
          state: data.state,
          neighborhood: data.neighborhood,
          addressDetail: data.addressDetail,
        },
        phone: data.phone,
        isHotelGuest: data.isHotelGuest,
      };

      const formatData = formatForm(newData);
      const request = api.attendeeApi.save(formatData, userData.token);
      request
        .then((data) => {
          toast("Salvo com sucesso!");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    initialValues: {
      // used to initialize the data
      cpf: "",
      name: "",
      birthday: null,
      phone: "",
      cep: "",
      street: "",
      city: "",
      number: "",
      state: "",
      neighborhood: "",
      addressDetail: "",
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
              error={false}
              helperText={null}
              placeholder="10/10/2018"
              format="dd-MM-yyyy"
              label="Birthday"
              inputVariant="outlined"
              clearable
              value={
                data.birthday !== null
                  ? dayjs(data.birthday, "DD-MM-YYYY").toString()
                  : null
              }
              onChange={(date) => {

                customHandleChange("birthday", (d) => {
                  if (d === null) {
                    return null;
                  }
                  return dayjs(d).format("DD-MM-YYYY");
                })(date);
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
            <Select
              label="State"
              name="state"
              id="state"
              value={data.state || ""}
              onChange={handleChange("state")}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ufList.map((uf) => (
                <MenuItem value={uf}>
                  <em>{uf}</em>
                </MenuItem>
              ))}
            </Select>
            {errors.state && <ErrorMsg>{errors.state}</ErrorMsg>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="City"
              name="city"
              value={data.city || ""}
              onChange={handleChange("city")}
              disabled={dinamicInputIsLoading}
            />
            {errors.city && <ErrorMsg>{errors.city}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Street"
              name="street"
              value={data.street || ""}
              onChange={handleChange("street")}
              disabled={dinamicInputIsLoading}
            />
            {errors.street && <ErrorMsg>{errors.street}</ErrorMsg>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Number"
              name="number"
              value={data.number || ""}
              onChange={handleChange("number")}
            />
            {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Neighborhood"
              name="neighborhood"
              value={data.neighborhood || ""}
              onChange={handleChange("neighborhood")}
              disabled={dinamicInputIsLoading}
            />
            {errors.neighborhood && <ErrorMsg>{errors.neighborhood}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="AddressDetail"
              name="addressDetail"
              value={data.addressDetail || ""}
              onChange={handleChange("addressDetail")}
            />
          </InputWrapper>

          <CustomSpan>
            <span>
              book hotel
              <Checkbox
                name="isHotelGuest"
                inputProps={{ "aria-label": "primary checkbox" }}
                checked={data.isHotelGuest || false}
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
