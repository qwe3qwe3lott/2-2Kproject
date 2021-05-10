export default function (instance) {
    return {
        getUsersList() {
            return instance.get('users/list')
        },
        addUser(payload) {
            return instance.post('users/add', payload)
        },
        deleteUser(payload) {
            return instance.post('users/delete', payload)
        },
        getAllRoles() {
            return instance.get('users/allRoles')
        }
    }
}