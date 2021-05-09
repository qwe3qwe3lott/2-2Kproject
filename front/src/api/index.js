import instance from './instance'

import adminModule from "./admin";

export default {
    admin: adminModule(instance)
}