import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/data-quality',
  name: 'data-quality',
  meta: { title: 'data-quality' },
  redirect: { name: 'task-result' },
  component: () => import('@/layouts/content'),
  children: [
    {
      path: '/data-quality/task-result',
      name: 'task-result',
      component: components['data-quality-task-result'],
      meta: {
        activeMenu: 'data-quality',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/data-quality/rule',
      name: 'data-quality-rule',
      component: components['data-quality-rule'],
      meta: {
        activeMenu: 'data-quality',
        showSide: true,
        auth: []
      }
    }
  ]
}
