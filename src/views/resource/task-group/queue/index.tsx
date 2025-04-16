import {
  ref,
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  getCurrentInstance
} from 'vue'
import {
  NButton,
  NIcon,
  NDataTable,
  NPagination,
  NSelect,
  NSpace
} from 'naive-ui'
import { SearchOutlined } from '@vicons/antd'
import { useTable } from './use-table'
import { queryTaskGroupListPaging } from '@/service/modules/task-group'
import { TaskGroupRes } from '@/service/modules/task-group/types'
import { SelectMixedOption } from 'naive-ui/lib/select/src/interface'
import { useRouter } from 'vue-router'
import FormModal from '@/views/resource/task-group/queue/components/form-modal'
import Card from '@/components/card'
import Search from '@/components/input-search'
import type { Ref } from 'vue'
import type { Router } from 'vue-router'

const taskGroupQueue = defineComponent({
  name: 'taskGroupQueue',
  setup() {
    const router: Router = useRouter()
    const { variables, getTableData } = useTable()
    const showModalRef = ref(false)
    const taskGroupOptions: Ref<Array<SelectMixedOption>> = ref([])

    const idRef = ref(Number(router.currentRoute.value.params.id))

    const searchParamRef = reactive({
      groupId: ref<number | null>(),
      processName: '',
      instanceName: '',
      pageSize: 10,
      pageNo: 1
    })

    let updateItemData = reactive({
      queueId: 0,
      priority: 0
    })

    const resetTableData = () => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo: variables.page,
        groupId: searchParamRef.groupId,
        taskInstanceName: searchParamRef.instanceName,
        processInstanceName: searchParamRef.processName
      })
    }

    const onCancel = () => {
      showModalRef.value = false
    }

    const onConfirm = () => {
      showModalRef.value = false
      updateItemData = {
        queueId: 0,
        priority: 0
      }
      resetTableData()
    }

    const onUpdatePageSize = () => {
      variables.page = 1
      resetTableData()
    }

    const updatePriority = (queueId: number, priority: number) => {
      showModalRef.value = true
      updateItemData.queueId = queueId
      updateItemData.priority = priority
    }

    const onSearch = () => {
      resetTableData()
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    onMounted(() => {
      const taskGroupOptionsParams = {
        pageNo: 1,
        pageSize: 2147483647
      }
      if (idRef.value) {
        searchParamRef.groupId = idRef.value
      }
      queryTaskGroupListPaging(taskGroupOptionsParams).then(
        (res: TaskGroupRes) => {
          res.totalList.map((item) => {
            const option: SelectMixedOption = {
              label: item.name,
              value: item.id
            }
            taskGroupOptions.value.push(option)
          })
        }
      )

      resetTableData()
    })

    return {
      ...toRefs(variables),
      onSearch,
      searchParamRef,
      resetTableData,
      onUpdatePageSize,
      updatePriority,
      onCancel,
      onConfirm,
      showModalRef,
      updateItemData,
      taskGroupOptions,
      trim
    }
  },
  render() {
    const {
      resetTableData,
      onUpdatePageSize,
      updatePriority,
      onCancel,
      onConfirm,
      onSearch,
      showModalRef,
      updateItemData,
      taskGroupOptions,
      loadingRef
    } = this

    const { columns } = useTable(updatePriority, resetTableData)

    return (
      <NSpace vertical>
        <Card>
          <NSpace justify='end'>
            <NSelect
              size='small'
              options={taskGroupOptions}
              clearable
              style={{ width: '180px' }}
              v-model:value={this.searchParamRef.groupId}
              placeholder='Task group name'
            />
            <Search
              v-model:value={this.searchParamRef.processName}
              placeholder='Workflow instance'
              onSearch={onSearch}
            ></Search>
            <Search
              v-model:value={this.searchParamRef.instanceName}
              placeholder='Task instance'
              onSearch={onSearch}
            ></Search>
            <NButton size='small' type='primary' onClick={onSearch}>
              <NIcon>
                <SearchOutlined />
              </NIcon>
            </NButton>
          </NSpace>
        </Card>
        <Card title='작업그룹 큐'>
          <NSpace vertical>
            <NDataTable
              loading={loadingRef}
              columns={columns}
              size={'small'}
              data={this.tableData}
              striped
              scrollX={this.tableWidth}
            />
            <NSpace justify='center'>
              <NPagination
                v-model:page={this.page}
                v-model:page-size={this.pageSize}
                page-count={this.totalPage}
                show-size-picker
                page-sizes={[10, 30, 50]}
                show-quick-jumper
                onUpdatePage={resetTableData}
                onUpdatePageSize={onUpdatePageSize}
              />
            </NSpace>
          </NSpace>
        </Card>
        {showModalRef && (
          <FormModal
            show={showModalRef}
            onCancel={onCancel}
            onConfirm={onConfirm}
            data={updateItemData}
          />
        )}
      </NSpace>
    )
  }
})

export default taskGroupQueue
