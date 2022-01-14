import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://back.std-1497.ist.mospolytech.ru',
  headers: {
    accept: 'applications/json'
  }
})

export default instance
