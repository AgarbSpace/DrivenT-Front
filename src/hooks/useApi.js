import EventApi from "../services/EventApi";
import EnrollmentApi from "../services/EnrollmentApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import AttendeeApi from "../services/AttendeeApi";
import CertificateAPI from "../services/CertificateApi";
import HotelApi from "../services/HotelApi";

export default function useApi() {
  return {
    event: new EventApi(),
    enrollment: new EnrollmentApi(),
    auth: new AuthApi(),
    cepApi:new CepApi(),
    attendeeApi: new AttendeeApi(),
    certificate: new CertificateAPI(),
    hotel: new HotelApi(),
  };
}
