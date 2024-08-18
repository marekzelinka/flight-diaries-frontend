import axios from 'axios';
import type { NonSensitiveDiaryEntry } from '../types';

const instance = axios.create({ baseURL: '/api/diaries' });

export const getAllDiaries = async () => {
  const response = await instance.get<NonSensitiveDiaryEntry[]>('/');
  return response.data;
};
