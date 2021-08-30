import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class HotelApi extends AuthenticatedApi {
  getHotels() {
    return api.get("/hotels");
  }
  
  getHotelBedrooms( hotelID ){
    return api.get(`/hotels/${hotelID}/bedrooms`);
  }

  rentAccommodation(hotelID, roomID) {
    return api.post(`/hotels/rent/${hotelID}/${roomID}`, null, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
