import api from './api';

export interface HallData {
    _id?: string; 
  name: string;
  rows: number;
  columns: number;
}

export const addHall = async (hallData: HallData) => {
  const response = await api.post('/halls/add', hallData);
  return response.data;
};

export const getAllHalls = async () => {
  const response = await api.get('/halls/all');
  return response.data;
};

export const getHallById = async (id: string) => {
  const response = await api.get(`/halls/${id}`);
  return response.data;
};

export const updateHall = async (id: string, hallData: HallData) => {
  const response = await api.put(`/halls/${id}`, hallData);
  return response.data;
};

export const deleteHall = async (id: string) => {
  const response = await api.delete(`/halls/${id}`);
  return response.data;
};

export const getHalls = async () => {
  const response = await api.get('/halls/all');
  return response.data;
};