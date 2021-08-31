import { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import { Checkbox } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";

import useApi from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";

import Input from "../Form/Input";
import Button from "../Form/Button";
import Select from "../../components/Form/Select";
import { FormWrapper } from "./FormWrapper";
import { CustomDatePicker } from "./CustomDatePicker";
import { InputWrapper } from "./InputWrapper";
import { CustomSpan } from "./CustomSpan";
import { ErrorMsg } from "./ErrorMsg";
import { ufList } from "./ufList";

dayjs.extend(CustomParseFormat);

export default function PersonalInformationForm() {
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
        custom: {
          isValid: (value) => isValidString(value),
          message: "Digite um nome válido",
        },
      },

      cpf: {
        custom: {
          isValid: (value) => parseInt(value?.length, 10) === 14,
          message: "Digite um CPF válido",
        },
      },

      phone: {
        custom: {
          isValid: (value) => parseInt(value?.length, 10) >= 13,
          message: "Digite um telefone válido",
        },
      },

      cep: {
        custom: {
          isValid: (value) => parseInt(value?.length, 10) === 9,
          message: "Digite um CEP válido",
        },
      },

      city: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "Digite uma cidade",
        },
      },

      neighborhood: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "Digite um bairro",
        },
      },

      street: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "Digite uma rua",
        },
      },

      state: {
        custom: {
          isValid: (value) => isValidString(value),
          message: "Selecione um estado",
        },
      },

      birthday: {
        custom: {
          isValid: (value) => !!new Date(value.split("-").reverse().join("-")),
          message: "Selecione uma data de aniversário",
        },
      },

      number: {
        custom: {
          isValid: (value) => Number(value),
          message: "Digite um número válido",
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
        phone: data.phone.replace(/[^0-9]+/g, "").replace(/^(\d{2})(9?\d{4})(\d{4})$/, "($1) $2-$3"),
        isHotelGuest: data.isHotelGuest,
      };

      api.attendeeApi.save(newData).then(() => {
        toast("Salvo com sucesso!");
      }).catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível");
        }
        /* eslint-disable-next-line no-console */
        console.log(error);
      });
    },

    initialValues: {
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

  useEffect(() => {
    api.attendeeApi.getPersonalInformations().then(response => {
      const { data } = response;
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

  function isValidCep(cep) {
    return cep.length === 8;
  }

  function isValidString(value) {
    return value || value?.trim();
  }

  function handleCepChanges(event) {
    const { name, value } = event.target;

    const valueWithoutMask = value.replace("-", "");

    if (isValidCep(valueWithoutMask)) {
      const newDataValues = {
        ...data,
        [name]: value
      };

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
      <Typography variant="h4">Suas Informações</Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormWrapper onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              label="Nome Completo"
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
              format="dd-MM-yyyy"
              label="Data de Nascimento"
              inputVariant="outlined"
              clearable
              value={data.birthday && dayjs(data.birthday, "DD-MM-YYYY").toString()}
              onChange={(date) => {
                customHandleChange("birthday", (d) => d && dayjs(d).format("DD-MM-YYYY"))(date);
              }}
            />
            {errors.birthday && <ErrorMsg>{errors.birthday}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Telefone"
              mask={data.phone.length < 15 ? "(99) 9999-99999" : "(99) 99999-9999"} // o 9 extra no primeiro é para permitir digitar um número a mais e então passar pra outra máscara - gambiarra? temos
              name="phone"
              value={data.phone || ""}
              onChange={handleChange("phone")}
            />
            {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="CEP"
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
              label="Estado"
              name="state"
              id="state"
              value={data.state || ""}
              onChange={handleChange("state")}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ufList.map((uf) => (
                <MenuItem value={uf.name} key={uf.id}>
                  <em>{uf.name}</em>
                </MenuItem>
              ))}
            </Select>
            {errors.state && <ErrorMsg>{errors.state}</ErrorMsg>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Cidade"
              name="city"
              value={data.city || ""}
              onChange={handleChange("city")}
              disabled={dinamicInputIsLoading}
            />
            {errors.city && <ErrorMsg>{errors.city}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Rua"
              name="street"
              value={data.street || ""}
              onChange={handleChange("street")}
              disabled={dinamicInputIsLoading}
            />
            {errors.street && <ErrorMsg>{errors.street}</ErrorMsg>}
          </InputWrapper>

          <InputWrapper>
            <Input
              label="Número"
              name="number"
              value={data.number || ""}
              onChange={handleChange("number")}
            />
            {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Bairro"
              name="neighborhood"
              value={data.neighborhood || ""}
              onChange={handleChange("neighborhood")}
              disabled={dinamicInputIsLoading}
            />
            {errors.neighborhood && <ErrorMsg>{errors.neighborhood}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Complemento"
              name="addressDetail"
              value={data.addressDetail || ""}
              onChange={handleChange("addressDetail")}
            />
          </InputWrapper>
          
          <CustomSpan>
            <div>
              Reservar Hotel
              <Checkbox
                name="isHotelGuest"
                inputProps={{ "aria-label": "primary checkbox" }}
                checked={data.isHotelGuest || false}
                onChange={(e) =>
                  customHandleChange("isHotelGuest")(e.target.checked)
                }
              />
            </div>
            <Button type="submit" disabled={dinamicInputIsLoading}>
              Salvar
            </Button>
          </CustomSpan>
        </FormWrapper>
      </MuiPickersUtilsProvider>
    </>
  );
}
