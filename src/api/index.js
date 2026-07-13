import axios from 'axios'
import router from '@/router'

const BASE = 'http://localhost:3000'

const api = axios.create({
  baseURL: BASE + '/api/v1'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export function imageUrl(path) {
  if (!path) return 'https://via.placeholder.com/300'
  if (path.startsWith('http')) return path
  if (path.startsWith('/')) return BASE + path
  return BASE + '/' + path
}

export default api
