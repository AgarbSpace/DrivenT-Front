import api from "./api";

export default class CertificateAPI {
  findOrCreate(attendeeId, token) {
    return api.get(`/certificate/attendeeId/${attendeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  findByCredential(credential) {
    return api.get(`/certificate/credential/${credential}`);
  }
}
