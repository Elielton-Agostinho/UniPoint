import axios from "axios";


const api = axios.create({
    baseURL: `https://unipointapi.heroku.com`,
});

export default api;
