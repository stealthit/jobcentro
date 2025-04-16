import { defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import { NGrid, NGi } from 'naive-ui'
import { startOfToday, getTime } from 'date-fns'
import { useTaskState } from './use-task-state'
import { useProcessState } from './use-process-state'
import StateCard from './components/state-card'
import DefinitionCard from './components/definition-card'

export default defineComponent({
  name: 'home',
  setup() {
    const dateRef = ref([getTime(startOfToday()), Date.now()])
    const taskStateRef = ref()
    const processStateRef = ref()
    const { getTaskState, taskVariables } = useTaskState()
    const { getProcessState, processVariables } = useProcessState()

    const initData = () => {
      taskStateRef.value = getTaskState(dateRef.value) || taskStateRef.value
      processStateRef.value =
        getProcessState(dateRef.value) || processStateRef.value
    }

    const handleTaskDate = (val: any) => {
      taskStateRef.value = getTaskState(val)
    }

    const handleProcessDate = (val: any) => {
      processStateRef.value = getProcessState(val)
    }

    onMounted(() => {
      initData()
    })

    watch(
      () => 'koKR',
      () => initData()
    )

    return {
      dateRef,
      handleTaskDate,
      handleProcessDate,
      taskStateRef,
      processStateRef,
      ...toRefs(taskVariables),
      ...toRefs(processVariables)
    }
  },
  render() {
    const {
      dateRef,
      handleTaskDate,
      handleProcessDate,
      taskLoadingRef,
      processLoadingRef
    } = this

    return (
      <div>
        <NGrid x-gap={12} cols={2}>
          <NGi>
            <StateCard
              title='작업 상태 현황'
              date={dateRef}
              tableData={this.taskStateRef?.value.table}
              chartData={this.taskStateRef?.value.chart}
              onUpdateDatePickerValue={handleTaskDate}
              loadingRef={taskLoadingRef}
            />
          </NGi>
          <NGi>
            <StateCard
              title='프로세스 상태 현황'
              date={dateRef}
              tableData={this.processStateRef?.value.table}
              chartData={this.processStateRef?.value.chart}
              onUpdateDatePickerValue={handleProcessDate}
              loadingRef={processLoadingRef}
            />
          </NGi>
        </NGrid>
        <NGrid cols={1} style='margin-top: 12px;'>
          <NGi>
            <DefinitionCard title='프로세스 정의 현황' />
          </NGi>
        </NGrid>
      </div>
    )
  }
})
