import api from "./api";

export default class EnrollmentApi {
  enroll(email, password) {
    return api.post("/enrollments", { email, password });
  }
}
