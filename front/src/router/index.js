import VueRouter from 'vue-router'
import api from '../api'
import AdminLayout from "../pages/AdminLayout";
import MainPage from "../pages/MainPage";
import ModerLayout from "../pages/ModerLayout";
import AuthPage from "../pages/AuthPage"
import Error404Page from "../pages/Error404Page"
import HeaderLayout from "../pages/HeaderLayout";
import MainLayout from "../pages/MainLayout";
import CatalogPage from "../pages/CatalogPage";
import BasketPage from "../pages/BasketPage";
import CatalogEditPage from "@/pages/CatalogEditPage";
import OrdersPage from "@/pages/OrdersPage";
import UsersEditPage from "@/pages/UsersEditPage";
import DashboardPage from "@/pages/DashboardPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'headerLayout',
            component: HeaderLayout,
            children: [
                {
                    path: '/',
                    name: 'mainLayout',
                    component: MainLayout,
                    children: [
                        {
                            path: '/',
                            name: 'main',
                            component: MainPage
                        },
                        {
                            path: '/catalog',
                            name: 'catalog',
                            component: CatalogPage
                        },
                        {
                            path: '/basket',
                            name: 'basket',
                            component: BasketPage
                        },
                        {
                            path: '/orderSuccess',
                            name: 'orderSuccess',
                            component: OrderSuccessPage
                        }
                    ]
                },
                {
                    path: '/admin',
                    name: 'admin',
                    component: AdminLayout,
                    beforeEnter: (to, from, next) => {
                        console.log(to)
                        console.log(from)
                        api.admin.checkAccess()
                            .then(res => {
                                console.log(res)
                                next()
                            })
                            .catch(err => {
                                console.log(err)
                                console.log(err.response.data)
                                next({name: 'auth'})
                            })
                    },
                    children: [
                        {
                            path: 'users',
                            name: 'usersEdit',
                            component: UsersEditPage
                        },
                        {
                            path: 'dashboard',
                            name: 'dashboard',
                            component: DashboardPage
                        }
                    ]
                },
                {
                    path: '/moder',
                    name: 'moderLayout',
                    component: ModerLayout,
                    beforeEnter: (to, from, next) => {
                        console.log(to)
                        console.log(from)
                        api.moder.checkAccess()
                            .then(res => {
                                console.log(res)
                                next()
                            })
                            .catch(err => {
                                console.log(err)
                                next({name: 'auth'})
                            })
                    },
                    children: [
                        {
                            path: 'catalog',
                            name: 'catalogEdit',
                            component: CatalogEditPage
                        },
                        {
                            path: 'orders',
                            name: 'orders',
                            component: OrdersPage
                        }
                    ]
                },
                {
                    path: '/auth',
                    name: 'auth',
                    component: AuthPage
                }
            ]
        },
        {
            path: '*',
            name: '404',
            component: Error404Page
        }
    ]
})