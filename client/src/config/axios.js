import axios from 'axios';
import { SERVER_URL } from './constant';

export default axios({
  baseURL: SERVER_URL,
});
