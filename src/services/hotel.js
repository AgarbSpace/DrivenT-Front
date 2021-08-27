import api from "./api";

export default class hotelsAPI {
  getHotels() {
    return api.get("/hotels");
  }
  
  getHotelBedrooms( hotelID ){
    return api.get(`/hotels/${hotelID}/bedrooms`)
  }

  rentAccommodation(hotelID, roomID) {
    const { token } = JSON.parse(localStorage.getItem('userData'))
    api.defaults.headers.authorization = `Bearer ${token}`;
    
    return api.post(`/hotels/rent/${hotelID}/${roomID}`)
  }
}
