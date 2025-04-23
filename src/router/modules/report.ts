import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/report',
  name: 'report',
  redirect: { name: 'top-n-analysis' },
  component: () => import('@/layouts/content'),
  children: [
    // Top N 분석
    {
      path: '/report/top-n-analysis',
      name: 'top-n-analysis',
      component: components['report-analysis'],
      meta: {
        activeMenu: 'report',
        showSide: true,
        auth: []
      }
    },
    // 상세 이력
    {
      path: '/report/detail-history',
      name: 'detail-history',
      component: components['report-history'],
      meta: {
        activeMenu: 'report',
        showSide: true,
        auth: []
      }
    }
  ]
}
