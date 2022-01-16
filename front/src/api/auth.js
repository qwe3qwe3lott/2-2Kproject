import { configs } from './index'

export default function (instance) {
  return {
    toAuth (payload) { return instance.post('auth', payload) },
    checkRole () { return instance.get('auth/checkRole', configs()) },
    sendEmail (payload) { return instance.get('auth/sendEmail', { params: payload }) },
    confirmCustomerCode (payload) { return instance.post('auth/confirmCustomerCode', payload) }
  }
}
