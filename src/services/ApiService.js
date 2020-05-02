import axios from 'axios';
import { API } from '../configs';

/*
  Just configuring a simple ApiService as an example!
  In the exercise it is not used, the data was mocked with a simple JSON
*/
const ApiService = axios.create({ baseURL: API.HOST });

export default ApiService;
