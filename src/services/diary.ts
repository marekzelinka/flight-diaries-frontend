import axios from 'axios';
import {
  DiaryEntry,
  type NewDiaryEntry,
  type NonSensitiveDiaryEntry,
} from '../types';

const instance = axios.create({ baseURL: '/api/diaries' });

export const getAllDiaries = async () => {
  const response = await instance.get<NonSensitiveDiaryEntry[]>('/');
  return response.data;
};

export const createDiary = async (newEntry: NewDiaryEntry) => {
  const response = await instance.post<DiaryEntry>('/', newEntry);
  return response.data;
};
