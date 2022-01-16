import { configs } from './index'

export default function (instance) {
  return {
    getOrdersByEmail: () => instance.get('orders/getOrdersByEmail', configs())
  }
}
