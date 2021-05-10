import VueRouter from 'vue-router'
import AdminPage from "../pages/AdminPage";
import MainPage from "../pages/MainPage";
import ModerPage from "../pages/ModerPage";
import AuthPage from "../pages/AuthPage"
import Error404Page from "../pages/Error404Page"
import HeaderLayout from "../pages/HeaderLayout";
import MainLayout from "../pages/MainLayout";
import CatalogPage from "../pages/CatalogPage";
import BasketLayout from "../pages/BasketLayout";

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
                            component: BasketLayout
                        }
                    ]
                },
                {
                    path: '/admin',
                    name: 'admin',
                    component: AdminPage
                },
                {
                    path: '/moder',
                    name: 'moder',
                    component: ModerPage
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