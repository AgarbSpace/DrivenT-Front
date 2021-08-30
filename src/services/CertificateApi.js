import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class CertificateAPI extends AuthenticatedApi {
  findOrCreate(attendeeId) {
    return api.get(`/certificate/attendeeId/${attendeeId}`, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  findByCredential(credential) {
    return api.get(`/certificate/credential/${credential}`, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
