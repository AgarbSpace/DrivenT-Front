import api from "./api";

export default class CertificateAPI {
  get(attendeeId) {
    return api.get(`/certificate/attendeeId/${attendeeId}`);
  }

  getByCredential(credential) {
    return api.get(`/certificate/credential/${credential}`);
  }
}
