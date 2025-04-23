import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/datasource',
  name: 'datasource',
  component: () => import('@/layouts/content'),
  children: [
    {
      path: '',
      name: 'datasource-list',
      component: components['datasource-list'],
      meta: {
        activeMenu: 'datasource',
        showSide: false,
        auth: []
      }
    }
  ]
}
