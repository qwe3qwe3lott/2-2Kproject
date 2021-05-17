export default function (instance) {
    return {
        getAllProducts() {
            return instance.get('products/all')
        }
    }
}