import api from './api';

export async function postTicket(body) {
  const response = await api.post('/enrollments/type', { name: body.ticketModality, hotel: body.includeHotel }, {
    headers: {
      Authorization: `Bearer ${body.token}`,
    }
  });
  return response.data;
}
