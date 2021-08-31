import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class AttendeeApi extends AuthenticatedApi {
  save(body) {
    return api.post("/attendee", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  getPersonalInformations() {
    return api.get("/attendee", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
