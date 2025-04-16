import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import utils from '@/utils'
import resourcesPage from './modules/resources'
import securityPage from './modules/security'
// todo: why is it throwing cannot find module and its corresponding type, but the render is working?
import uiSettingPage from './modules/ui-setting'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

/**
 * Basic page
 */
const basePage: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'home' },
    component: () => import('@/layouts/content'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: components['home'],
        meta: {
          activeMenu: 'home',
          auth: []
        }
      },
      {
        path: '/password',
        name: 'password',
        component: components['password'],
        meta: {
          auth: []
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: components['profile'],
        meta: {
          auth: []
        }
      }
    ]
  },
  resourcesPage,
  securityPage,
  uiSettingPage
]

/**
 * Login page
 */
const loginPage: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: components['login'],
    meta: {
      auth: []
    }
  }
]

const routes: RouteRecordRaw[] = [...basePage, ...loginPage]

export default routes
