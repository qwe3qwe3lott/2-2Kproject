import { configs } from './index'
export default function (instance) {
  return {
    getUsersList () {
      return instance.get('users/list', configs())
    },
    addUser (payload) {
      return instance.post('users/add', payload, configs())
    },
    deleteUser (payload) {
      return instance.post('users/delete', payload, configs())
    },
    getAllRoles () {
      return instance.get('users/allRoles', configs())
    },
    checkAccess () {
      return instance.get('auth/checkAdmin', configs())
    },
    getProductsDashboardData () {
      return instance.get('products/getDashboardData', configs())
    },
    getOrdersDashboardData () {
      return instance.get('orders/getDashboardData', configs())
    }
  }
}
