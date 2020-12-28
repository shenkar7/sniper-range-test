import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://range-a468d-default-rtdb.firebaseio.com/'
});

export default instance;