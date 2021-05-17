export default function (instance) {
    return {
        getToken() {
            return instance.get('auth')
        }
    }
}