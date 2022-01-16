import instance from './instance'

import adminModule from './admin'
import moderModule from './moder'
import authModule from './auth'
import userModule from './user'
import customerModule from './customer'

export const configs = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
}

export default {
  admin: adminModule(instance),
  moder: moderModule(instance),
  auth: authModule(instance),
  user: userModule(instance),
  customer: customerModule(instance)
}
