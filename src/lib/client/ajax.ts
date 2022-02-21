import axios from 'axios'

export default function enter(data: { email?: string; phone?: number }) {
  return axios.post('/api/users/enter', data)
}
