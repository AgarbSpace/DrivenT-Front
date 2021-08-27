import api from "./api";

export default class AttendeeApi {
  save(body, token) {
    return api.post("/attendee/", body,{headers: {Authorization: `Bearer ${token}`}});
  }
  getAttendeePersonalInformations(token){
    return api.get("/attendee/",{headers: {"Authorization": `Bearer ${token}`}})
  }
}
