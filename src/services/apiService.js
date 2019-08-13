import axios from 'axios';

const ApiService = {};

ApiService.gitHub = axios.create({
  /*
    Used to simulate the login, the "username" inputed in the
    LoginForm is used to get this user from GitHub
  */
  baseURL: 'https://api.github.com/',
});

export default ApiService;
