import api from "./api";

export default class AttendeeApi {
  save(body, token) {
    return api.post("/attendee/", body,{headers: {Authorization: `JWT ${token}`}});
  }
  getAttendeePersonalInformations(token){
    return api.get("/attendee/",{headers: {"Authorization": `JWT ${token}`}})
  }
}
