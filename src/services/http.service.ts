import axios from 'axios'

const API_URL = process.env.API_URL

const http = axios.create({
  baseURL: API_URL,
  headers: { Accept: 'application/json' },
})

export default http
