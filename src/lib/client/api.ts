import axios from 'axios'

export function enter(data: { email?: string; phone?: number }) {
  return axios.post('/api/users/enter', data)
}

export function confirm(data: { token: string }) {
  return axios.post('/api/users/confirm', data)
}
