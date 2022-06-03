import api from './api';

export async function getHotelsInfo() {
  const response = await api.get('/hotels');
  return response.data;
};
