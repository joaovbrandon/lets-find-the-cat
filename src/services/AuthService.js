import axios from 'axios';
import { API } from '../configs';

/*
  Used to simulate the login, the "username" inputed in the
  LoginForm is used to get this user from GitHub
*/
const AuthService = axios.create({ baseURL: API.AUTH });

export default AuthService;
