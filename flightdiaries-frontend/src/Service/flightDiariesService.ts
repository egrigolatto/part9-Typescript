import axios from "axios";
import { Diary, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

const getAllNonSensitive = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return response.data.map(({ comment, ...rest }) => rest);
};

const createDiary = async (object: NewDiaryEntry) => {
  const response = await axios.post<Diary>(baseUrl, object);
  return response.data;
};

export default { getAll, getAllNonSensitive, createDiary };