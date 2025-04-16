import { useAsyncState } from '@vueuse/core'
import { countProcessInstanceState } from '@/service/modules/projects-analysis'
import { format } from 'date-fns'
import { toLower } from 'lodash'
import type { WorkflowInstanceCountVo } from '@/service/modules/projects-analysis/types'
import type { StateData } from './types'
import { reactive, ref } from 'vue'

export function useProcessState() {
  const processVariables = reactive({
    processLoadingRef: ref(false)
  })

  const getProcessState = (date: Array<number>) => {
    if (processVariables.processLoadingRef) return
    processVariables.processLoadingRef = true
    const { state } = useAsyncState(
      countProcessInstanceState({
        startDate: !date ? '' : format(date[0], 'yyyy-MM-dd HH:mm:ss'),
        endDate: !date ? '' : format(date[1], 'yyyy-MM-dd HH:mm:ss')
      }).then((res: WorkflowInstanceCountVo): StateData => {
        const table = res.workflowInstanceStatusCounts.map((item) => {
          return {
            state: toLower(item.state),
            number: item.count
          }
        })

        const chart = res.workflowInstanceStatusCounts.map((item) => {
          return {
            value: item.count,
            name: toLower(item.state)
          }
        })

        processVariables.processLoadingRef = false
        return { table, chart }
      }),
      { table: [], chart: [] }
    )

    return state
  }

  return { getProcessState, processVariables }
}
