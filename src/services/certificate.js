import api from "./api";

export default class CertificateAPI {
  findOrCreate(attendeeId) {
    return api.get(`/certificate/attendeeId/${attendeeId}`);
  }

  findByCredential(credential) {
    return api.get(`/certificate/credential/${credential}`);
  }
}
