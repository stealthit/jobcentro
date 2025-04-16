import { useAsyncState } from '@vueuse/core'
import { format } from 'date-fns'
import { toLower } from 'lodash'
import { countTaskState } from '@/service/modules/projects-analysis'
import type { TaskInstanceCountVo } from '@/service/modules/projects-analysis/types'
import type { StateData } from './types'
import { reactive, ref } from 'vue'

export function useTaskState() {
  const taskVariables = reactive({
    taskLoadingRef: ref(false)
  })

  const getTaskState = (date: Array<any>) => {
    if (taskVariables.taskLoadingRef) return
    taskVariables.taskLoadingRef = true
    const { state } = useAsyncState(
      countTaskState({
        startDate: !date ? '' : format(date[0], 'yyyy-MM-dd HH:mm:ss'),
        endDate: !date ? '' : format(date[1], 'yyyy-MM-dd HH:mm:ss')
      }).then((res: TaskInstanceCountVo): StateData => {
        const table = res.taskInstanceStatusCounts.map((item, unused) => {
          return {
            state: toLower(item.state),
            number: item.count
          }
        })

        const chart = res.taskInstanceStatusCounts.map((item) => {
          return {
            value: item.count,
            name: toLower(item.state)
          }
        })
        taskVariables.taskLoadingRef = false
        return { table, chart }
      }),
      { table: [], chart: [] }
    )

    return state
  }

  return { getTaskState, taskVariables }
}
