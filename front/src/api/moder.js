import { configs } from './index'
export default function (instance) {
    return {
        deleteProduct(payload) {
            return instance.post('products/delete', payload, configs())
        },
        checkAccess() {
            return instance.get('auth/checkModer', configs())
        },
        updateProduct(payload) {
            return instance.post('products/update', payload, configs())
        },
        addProduct(payload) {
            return instance.post('products/add', payload, configs())
        },
        getAllProductTypes() {
            return instance.get('products/allTypes', configs())
        },
        getAllOrders() {
            return instance.get('orders/all', configs())
        },
        getAllOrderStatuses() {
            return instance.get('orders/allStatuses', configs())
        },
        updateOrderStatus(payload) {
            return instance.post('orders/updateStatus', payload, configs())
        }
    }
}