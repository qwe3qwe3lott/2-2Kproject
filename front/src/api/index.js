import instance from './instance'

import adminModule from "./admin";
import moderModule from './moder'
import authModule from './auth'

export const configs = () => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}

export default {
    admin: adminModule(instance),
    moder: moderModule(instance),
    auth: authModule(instance)
}