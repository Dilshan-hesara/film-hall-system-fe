import api from './api';

export interface HallData {
    _id?: string; // ID එකත් ඕන වෙනවා Dropdown එකට
  name: string;
  rows: number;
  columns: number;
}

export const addHall = async (hallData: HallData) => {
  const response = await api.post('/halls/add', hallData);
  return response.data;
};

// src/services/hall.ts ඇතුලට දාන්න:
export const getAllHalls = async () => {
  const response = await api.get('/halls/all');
  return response.data;
};

