import axios from 'axios';
import { SERVER_URL } from './constant';

export default axios.create({
  baseURL: SERVER_URL,
});
