import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/monitor',
  name: 'monitor',
  meta: { title: 'monitor' },
  redirect: { name: 'servers-master' },
  component: () => import('@/layouts/content'),
  children: [
    {
      path: '/monitor/master',
      name: 'servers-master',
      component: components['monitor-servers-master'],
      meta: {
        activeMenu: 'monitor',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/monitor/worker',
      name: 'servers-worker',
      component: components['monitor-servers-worker'],
      meta: {
        activeMenu: 'monitor',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/monitor/alert_server',
      name: 'servers-alert-server',
      component: components['monitor-servers-alert_server'],
      meta: {
        activeMenu: 'monitor',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/monitor/db',
      name: 'servers-db',
      component: components['monitor-servers-db'],
      meta: {
        activeMenu: 'monitor',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/monitor/statistics',
      name: 'statistics-statistics',
      component: components['monitor-statistics-statistics'],
      meta: {
        activeMenu: 'monitor',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/monitor/audit-log',
      name: 'statistics-audit-log',
      component: components['monitor-statistics-audit-log'],
      meta: {
        activeMenu: 'monitor',
        showSide: true,
        auth: []
      }
    }
  ]
}
