export default function (instance) {
    return {
        deleteProduct(payload) {
            return instance.post('products/delete', payload)
        }
    }
}