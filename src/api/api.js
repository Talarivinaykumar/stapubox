import axios from 'axios';

const API_TOKEN = 'trial_33936245_2bc8e91677d7bdf0e09b4264d6f4541f';

const api = axios.create({
  baseURL: 'https://stapubox.com/trial',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Token': API_TOKEN,
  },
  timeout: 15000,
});

export const sendOtp = async (mobile) => {
  const response = await api.post('/sendOtp', { mobile });
  return response.data;
};

export const resendOtp = async (mobile) => {
  const response = await api.post(`/resendOtp?mobile=${mobile}`);
  return response.data;
};

export const verifyOtp = async (mobile, otp) => {
  const response = await api.post(`/verifyOtp?mobile=${mobile}&otp=${otp}`);
  return response.data;
};