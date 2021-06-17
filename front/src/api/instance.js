import axios from "axios";

const instance = axios.create({
    //baseURL: 'http://localhost:3000',
    baseURL: 'http://std-1497.ist.mospolytech.ru:3000',
    headers: {
        accept: 'applications/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export default instance