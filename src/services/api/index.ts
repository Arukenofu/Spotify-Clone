import { ofetch } from 'ofetch/node'

const api = ofetch.create({
  credentials: 'include',
})

export default api
