import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/publish',
  name: 'publish',
  redirect: { name: 'publish' },
  component: () => import('@/layouts/content'),
  children: [
    {
      path: '/publish/pub1',
      name: 'pub1',
      component: components['publish-pub1'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    },
    {
      path: '/publish/pub2',
      name: 'pub2',
      component: components['publish-pub2'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    },
    {
      path: '/publish/pub3',
      name: 'pub3',
      component: components['publish-pub3'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    },
    {
      path: '/publish/pub4',
      name: 'pub4',
      component: components['publish-pub4'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    },
    {
      path: '/publish/pub5',
      name: 'pub5',
      component: components['publish-pub5'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    },
    // pub6부터는 src/views/publish/pub6 생성 필수
    {
      path: '/publish/pub6',
      name: 'pub6',
      component: components['publish-pub6'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    },
    {
      path: '/publish/pub7',
      name: 'pub7',
      component: components['publish-pub7'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    },
    {
      path: '/publish/pub8',
      name: 'pub8',
      component: components['publish-pub8'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    },
    {
      path: '/publish/pub9',
      name: 'pub9',
      component: components['publish-pub9'],
      meta: {
        activeMenu: 'home',
        showSide: false,
        auth: []
      }
    }
  ]
}
