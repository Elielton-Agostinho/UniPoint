import axios from 'axios';
//import baseUrl from './data-service';
axios.defaults.baseURL = 'https://unipointapi.herokuapp.com/login';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const app = axios.create({
    baseURL: `https://unipointapi.herokuapp.com/login`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export default app;