import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.commmon['Authorization'] = 'AUTH TOKEN';

export default axios;
