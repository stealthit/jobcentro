import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/projects',
  name: 'projects',
  redirect: { name: 'projects-list' },
  component: () => import('@/layouts/content'),
  children: [
    {
      path: '/projects/list',
      name: 'projects-list',
      component: components['projects-list'],
      meta: {
        activeMenu: 'projects',
        showSide: false,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode',
      name: 'projects-overview',
      component: components['projects-overview'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/parameter',
      name: 'projects-parameter',
      component: components['projects-parameter'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/preferences',
      name: 'projects-preference',
      component: components['projects-preference'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow/relation',
      name: 'workflow-relation',
      component: components['projects-workflow-relation'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow-definition',
      name: 'workflow-definition-list',
      component: components['projects-workflow-definition'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow-definition/timing/:definitionCode',
      name: 'workflow-definition-timing',
      component: components['projects-workflow-definition-timing'],
      meta: {
        activeMenu: 'projects',
        activeSide: '/projects/:projectCode/workflow-definition',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow/definitions/create',
      name: 'workflow-definition-create',
      component: components['projects-workflow-definition-create'],
      meta: {
        activeMenu: 'projects',
        activeSide: '/projects/:projectCode/workflow-definition',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow/definitions/:code',
      name: 'workflow-definition-detail',
      component: components['projects-workflow-definition-detail'],
      meta: {
        activeMenu: 'projects',
        activeSide: '/projects/:projectCode/workflow-definition',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow/timings',
      name: 'workflow-timing-list',
      component: components['projects-workflow-timing'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow/instances',
      name: 'workflow-instance-list',
      component: components['projects-workflow-instance'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow/instances/:id',
      name: 'workflow-instance-detail',
      component: components['projects-workflow-instance-detail'],
      meta: {
        activeMenu: 'projects',
        activeSide: '/projects/:projectCode/workflow/instances',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow/instances/:id/gantt',
      name: 'workflow-instance-gantt',
      component: components['projects-workflow-instance-gantt'],
      meta: {
        activeMenu: 'projects',
        activeSide: '/projects/:projectCode/workflow/instances',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/task/definitions',
      name: 'task-definition',
      component: components['projects-task-definition'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/task/instances',
      name: 'task-instance',
      component: components['projects-task-instance'],
      meta: {
        activeMenu: 'projects',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/projects/:projectCode/workflow-definition/tree/:definitionCode',
      name: 'workflow-definition-tree',
      component: components['projects-workflow-definition-tree'],
      meta: {
        activeMenu: 'projects',
        activeSide: '/projects/:projectCode/workflow-definition',
        showSide: true,
        auth: []
      }
    }
  ]
}
