export default function (instance) {
    return {
        getAllProducts() {
            return instance.get('products/all')
        },
        addOrder(payload) {
            return instance.post('orders/add', payload)
        }
    }
}