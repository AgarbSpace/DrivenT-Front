import api from "./api";

export default class AttendeeApi {
  save(body, token) {
    return api.post("/attendee/", body,{headers: {Authorization: `JWT ${token}`}});
  }
}
