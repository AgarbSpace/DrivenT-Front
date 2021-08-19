import EventApi from "../services/event";
import EnrollmentApi from "../services/enrollment";
import AuthApi from "../services/auth";

export default function useApi() {
  return {
    event: new EventApi(),
    enrollment: new EnrollmentApi(),
    auth: new AuthApi()
  };
}
