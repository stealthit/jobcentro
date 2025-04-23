import type { Component } from 'vue'
import utils from '@/utils'

// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.tsx')
const components: { [key: string]: Component } = utils.mapping(modules)

export default {
  path: '/prediction',
  name: 'prediction',
  redirect: { name: 'schedule-info' },
  component: () => import('@/layouts/content'),
  children: [
    //일간 스케줄
    {
      path: '/prediction/day-schedule/schedule-info',
      name: 'schedule-info',
      component: components['prediction-day-schedule-schedule-info'],
      meta: {
        activeMenu: 'prediction',
        activeSideMenu: 'day-schedule',
        showSide: true,
        auth: []
      }
    },
    {
      path: '/prediction/day-schedule/time-status',
      name: 'time-status',
      component: components['prediction-day-schedule-time-status'],
      meta: {
        activeMenu: 'prediction',
        activeSideMenu: 'day-schedule',
        showSide: true,
        auth: []
      }
    },
    //월간 스케줄
    {
      path: '/prediction/month-schedule',
      name: 'month-schedule',
      component: components['prediction-month-schedule'],
      meta: {
        activeMenu: 'prediction',
        activeSideMenu: 'month-schedule',
        showSide: true,
        auth: []
      }
    }
  ]
}
