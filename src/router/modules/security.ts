import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/security',
  name: 'security',
  redirect: { name: 'tenant-manage' },
  component: () => import('@/layouts/content'),
  children: [
    {
      path: '/security/tenant-manage',
      name: 'tenant-manage',
      component: components['security-tenant-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    },
    {
      path: '/security/user-manage',
      name: 'user-manage',
      component: components['security-user-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    },
    {
      path: '/security/alarm-group-manage',
      name: 'alarm-group-manage',
      component: components['security-alarm-group-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    },
    {
      path: '/security/worker-group-manage',
      name: 'worker-group-manage',
      component: components['security-worker-group-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    },
    {
      path: '/security/yarn-queue-manage',
      name: 'yarn-queue-manage',
      component: components['security-yarn-queue-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    },
    {
      path: '/security/environment-manage',
      name: 'environment-manage',
      component: components['security-environment-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    },
    {
      path: '/security/cluster-manage',
      name: 'cluster-manage',
      component: components['security-cluster-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    },
    {
      path: '/security/token-manage',
      name: 'token-manage',
      component: components['security-token-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/security/alarm-instance-manage',
      name: 'alarm-instance-manage',
      component: components['security-alarm-instance-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    },
    {
      path: '/security/k8s-namespace-manage',
      name: 'k8s-namespace-manage',
      component: components['security-k8s-namespace-manage'],
      meta: {
        activeMenu: 'security',
        showSide: true,
        auth: ['ADMIN_USER']
      }
    }
  ]
}
