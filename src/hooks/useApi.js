import EventApi from "../services/event";
import EnrollmentApi from "../services/enrollment";

export default function useApi() {
  return {
    event: new EventApi(),
    enrollment: new EnrollmentApi()
  };
}
