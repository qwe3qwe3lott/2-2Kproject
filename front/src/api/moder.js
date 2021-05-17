import { configs } from './index'
export default function (instance) {
    return {
        deleteProduct(payload) {
            return instance.post('products/delete', payload, configs())
        },
        checkAccess() {
            return instance.get('auth/checkModer', configs())
        }
    }
}