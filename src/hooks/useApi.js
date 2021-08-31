import EventApi from "../services/EventApi";
import UserApi from "../services/UserApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import EnrollmentApi from "../services/AttendeeApi";
import CertificateAPI from "../services/CertificateApi";
import HotelApi from "../services/HotelApi";

export default function useApi() {
  return {
    event: new EventApi(),
    user: new UserApi(),
    auth: new AuthApi(),
    cepApi: new CepApi(),
    enrollmentApi: new EnrollmentApi(),
    certificate: new CertificateAPI(),
    hotel: new HotelApi(),
  };
}
