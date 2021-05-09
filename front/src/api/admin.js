export default function (instance) {
    return {
        getUsersList() {
            return instance.get('users/list')
        }
    }
}