import axios from "axios";
import { triviaResp } from '../types/trivia'

export const api = (url: string, method = "get") => {
  return axios[method](url);
};

export const handleFetchTrivia = async () => {

  //if we wanted, we could have hidden it into a non shippable env file, such as .env.local and so on so forth
  const { data } = await api(process.env.NEXT_PUBLIC_API_BASE_URL!) as triviaResp;
  return data.results;
};

