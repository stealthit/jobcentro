import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import utils from '@/utils'
import projectsPage from './modules/projects'
import resourcesPage from './modules/resources'
import datasourcePage from './modules/datasource'
import monitorPage from './modules/monitor'
import securityPage from './modules/security'
import dataQualityPage from './modules/data-quality'
import predictionPage from './modules/prediction'
import reportPage from './modules/report'
import publishPage from './modules/publish'

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
  projectsPage,
  resourcesPage,
  datasourcePage,
  monitorPage,
  securityPage,
  dataQualityPage,
  uiSettingPage,
  predictionPage,
  reportPage,
  publishPage // publish
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
