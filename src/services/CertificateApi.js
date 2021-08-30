import AuthenticatedApi from "./AuthenticatedApi"
import api from "./api";

export default class CertificateAPI extends AuthenticatedApi {
  findOrCreate() {
    return api.get(`/certificate`, {
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
