import VueRouter from 'vue-router'
import api from '../api'
import MainPage from '../pages/MainPage'
import AuthPage from '../pages/AuthPage'
import Error404Page from '../pages/Error404Page'
import HeaderLayout from '../layouts/HeaderLayout'
import MainLayout from '../layouts/MainLayout'
import CatalogPage from '../pages/CatalogPage'
import BasketPage from '../pages/BasketPage'
import CatalogEditPage from '@/pages/CatalogEditPage'
import OrdersPage from '@/pages/OrdersPage'
import UsersEditPage from '@/pages/UsersEditPage'
import DashboardPage from '@/pages/DashboardPage'
import OrderSuccessPage from '@/pages/OrderSuccessPage'
import CustomerHistoryPage from '@/pages/CustomerHistoryPage'
import PersonalRoomLayout from '@/layouts/PersonalRoomLayout'

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
          name: 'adminLayout',
          component: PersonalRoomLayout,
          props: {
            isAdmin: true,
            title: 'Администранорная',
            navs: [
              { name: 'usersEdit', label: 'Настройка пользователей' },
              { name: 'dashboard', label: 'Дашборд' }
            ]
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
          component: PersonalRoomLayout,
          props: {
            title: 'Модераторная',
            navs: [
              { name: 'catalogEdit', label: 'Настройка каталога' },
              { name: 'orders', label: 'Заказы' }
            ]
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
          path: '/customer',
          name: 'customerLayout',
          component: PersonalRoomLayout,
          props: {
            title: 'Личный кабинет',
            navs: [
              { name: 'customerHistory', label: 'История заказов' }
            ]
          },
          children: [
            {
              path: 'history',
              name: 'customerHistory',
              component: CustomerHistoryPage
            }
          ]
        },
        {
          path: '/auth',
          name: 'auth',
          component: AuthPage,
          beforeEnter: (to, from, next) => {
            api.auth.checkRole()
              .then(res => {
                console.log(res)
                next({ name: res.data.name })
              })
              .catch(err => {
                console.log(err)
                next()
              })
          }
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
