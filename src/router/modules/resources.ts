import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/resource',
  name: 'resource',
  redirect: { name: 'file-manage' },
  component: () => import('@/layouts/content'),
  children: [
    {
      path: '/resource/file-manage',
      name: 'file-manage',
      component: components['resource-file'],
      meta: {
        activeMenu: 'resource',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/file/create',
      name: 'resource-file-create',
      component: components['resource-file-create'],
      meta: {
        activeMenu: 'resource',
        activeSide: '/resource/file-manage',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/file/edit',
      name: 'resource-file-edit',
      component: components['resource-file-edit'],
      meta: {
        activeMenu: 'resource',
        activeSide: '/resource/file-manage',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/file/subdirectory',
      name: 'resource-file-subdirectory',
      component: components['resource-file'],
      meta: {
        activeMenu: 'resource',
        activeSide: '/resource/file-manage',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/file/list',
      name: 'resource-file-list',
      component: components['resource-file-edit'],
      meta: {
        activeMenu: 'resource',
        activeSide: '/resource/file-manage',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/file/create',
      name: 'resource-subfile-create',
      component: components['resource-file-create'],
      meta: {
        activeMenu: 'resource',
        activeSide: '/resource/file-manage',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/resource-manage',
      name: 'resource-manage',
      component: components['resource-udf-resource'],
      meta: {
        activeMenu: 'resource',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/resource-manage',
      name: 'resource-sub-manage',
      component: components['resource-udf-resource'],
      meta: {
        activeMenu: 'resource',
        activeSide: '/resource/resource-manage',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/function-manage',
      name: 'function-manage',
      component: components['resource-udf-function'],
      meta: {
        activeMenu: 'resource',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/task-group-option',
      name: 'task-group-option',
      component: components['resource-task-group-option'],
      meta: {
        activeMenu: 'resource',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/resource/task-group-queue',
      name: 'task-group-queue',
      component: components['resource-task-group-queue'],
      meta: {
        activeMenu: 'resource',
        showSide: true,
        auth: []
      }
    }
  ]
}
