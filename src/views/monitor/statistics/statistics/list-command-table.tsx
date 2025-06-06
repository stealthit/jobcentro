import {
  defineComponent,
  onMounted,
  toRefs,
  watch,
  reactive,
  ref,
  h
} from 'vue'
import { NSpace, NDataTable, NPagination } from 'naive-ui'
import Card from '@/components/card'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import { useAsyncState } from '@vueuse/core'
import { queryListCommandPaging } from '@/service/modules/projects-analysis'

const ListCommandTable = defineComponent({
  name: 'list-command-table',
  setup() {
    const variables = reactive({
      columns: [],
      tableWidth: DefaultTableWidth,
      tableData: [],
      page: ref(1),
      pageSize: ref(10),
      userName: ref(null),
      totalPage: ref(1),
      loadingRef: ref(false)
    })

    const createColumns = (variables: any) => {
      variables.columns = [
        {
          title: 'ID',
          key: 'id',
          ...COLUMN_WIDTH_CONFIG['index']
        },
        {
          title: 'Command Type',
          key: 'commandType',
          ...COLUMN_WIDTH_CONFIG['userName']
        },
        {
          title: 'Command Param',
          key: 'commandParam',
          ...COLUMN_WIDTH_CONFIG['linkName']
        },

        {
          title: 'Task Info',
          key: 'id',
          width: 300,
          render: (row: any) => {
            return h('div', [
              `Definition Code：${row.processDefinitionCode} `,
              h('br'),
              `Definition Version：${row.processDefinitionVersion} `,
              h('br'),
              `Instance Id：${row.processInstanceId} `,
              h('br'),
              `Instance Priority：${row.processInstancePriority} `
            ])
          }
        },

        {
          title: 'Task Params',
          key: 'id',
          width: 300,
          render: (row: any) => {
            return h('div', [
              `DryRun：${row.dryRun} `,
              h('br'),
              `Environment Code：${row.environmentCode} `,
              h('br'),
              `Failure Strategy：${row.failureStrategy} `,
              h('br'),
              `Task Depend Type：${row.taskDependType} `
            ])
          }
        },

        {
          title: 'Worker Info',
          key: 'id',
          width: 220,
          render: (row: any) => {
            return h('div', [
              `Worker Group：${row.workerGroup} `,
              h('br'),
              `Tenant Code：${row.tenantCode} `,
              h('br'),
              `Test Flag：${row.testFlag} `
            ])
          }
        },

        {
          title: 'Warning Info',
          key: 'id',
          width: 200,
          render: (row: any) => {
            return h('div', [
              `Warning Group Id：${row.warningGroupId} `,
              h('br'),
              `Warning Type：${row.warningType} `
            ])
          }
        },
        {
          title: 'Executor Id',
          key: 'executorId',
          ...COLUMN_WIDTH_CONFIG['type']
        },
        {
          title: 'Time',
          key: 'startTime',
          width: 280,
          render: (row: any) => {
            return h('div', [
              `Start Time：${row.startTime} `,
              h('br'),
              `Update Time：${row.updateTime} `,
              h('br'),
              `Schedule Time：${row.scheduleTime} `
            ])
          }
        }
      ]

      if (variables.tableWidth) {
        variables.tableWidth = calculateTableWidth(variables.columns)
      }
    }

    const getTableData = () => {
      if (variables.loadingRef) return
      variables.loadingRef = true
      const data = {
        pageSize: variables.pageSize,
        pageNo: variables.page
      }

      const { state } = useAsyncState(
        queryListCommandPaging(data).then((res: any) => {
          variables.totalPage = res.totalPage
          variables.tableData = res.totalList
          variables.loadingRef = false
        }),
        {}
      )

      return state
    }

    const onUpdatePageSize = () => {
      variables.page = 1
      getTableData()
    }

    onMounted(() => {
      createColumns(variables)
      getTableData()
    })

    watch(() => 'koKR', () => {
      createColumns(variables)
    })

    return {
      ...toRefs(variables),
      getTableData,
      onUpdatePageSize
    }
  },
  render() {
    const { getTableData, onUpdatePageSize, loadingRef } = this

    return (
      <NSpace vertical>
        <Card>
          <NSpace vertical>
            <NDataTable
              size={'small'}
              loading={loadingRef}
              columns={this.columns}
              scrollX={this.tableWidth}
              data={this.tableData}
            />
            <NSpace justify='center'>
              <NPagination
                v-model:page={this.page}
                v-model:page-size={this.pageSize}
                page-count={this.totalPage}
                show-size-picker
                page-sizes={[10, 30, 50]}
                show-quick-jumper
                onUpdatePage={getTableData}
                onUpdatePageSize={onUpdatePageSize}
              />
            </NSpace>
          </NSpace>
        </Card>
      </NSpace>
    )
  }
})

export default ListCommandTable
