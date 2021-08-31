import EventApi from "../services/EventApi";
import UserApi from "../services/UserApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import AttendeeApi from "../services/AttendeeApi";
import CertificateAPI from "../services/CertificateApi";
import HotelApi from "../services/HotelApi";

export default function useApi() {
  return {
    event: new EventApi(),
    user: new UserApi(),
    auth: new AuthApi(),
    cepApi: new CepApi(),
    attendeeApi: new AttendeeApi(),
    certificate: new CertificateAPI(),
    hotel: new HotelApi(),
  };
}
