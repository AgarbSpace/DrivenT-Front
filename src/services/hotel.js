import api from "./api";

export default class hotelsAPI {
  getHotels() {
    return api.get("/hotels");
  }
  
  getHotelBedrooms( hotelID ){
    return api.get(`/hotels/${hotelID}/bedrooms`)
  }

  rentAccommodation(hotelID, roomID) {
    return api.get(`/rent/${hotelID}/${roomID}`)
  }
}
