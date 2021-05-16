import instance from './instance'

import adminModule from "./admin";
import moderModule from './moder'

export default {
    admin: adminModule(instance),
    moder: moderModule(instance)
}