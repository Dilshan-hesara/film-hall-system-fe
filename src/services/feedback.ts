import api from './api';

// Add Feedback
export const submitFeedback = async (data: { userId: string; rating: number; message: string }) => {
  const response = await api.post('/feedback/add', data);
  return response.data;
};

// Get All Feedbacks
export const getFeedbacks = async () => {
  const response = await api.get('/feedback/all');
  return response.data;
};