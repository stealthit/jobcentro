import { h, reactive, ref } from 'vue'
import { format } from 'date-fns'
import type { TableColumns } from 'naive-ui/es/data-table/src/interface'
import {
  queryTaskGroupListPaging,
  queryTaskListInTaskGroupQueueById
} from '@/service/modules/task-group'
import TableAction from './components/table-action'
import _ from 'lodash'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import { parseTime } from '@/common/common'

export function useTable(
  updatePriority = (unusedQueueId: number, unusedPriority: number): void => {},
  resetTableData = () => {}
) {
  const columns: TableColumns<any> = [
    {
      title: '#',
      key: 'index',
      render: (row, index) => index + 1,
      ...COLUMN_WIDTH_CONFIG['index']
    },
    {
      title: '프로젝트명',
      key: 'projectName',
      ...COLUMN_WIDTH_CONFIG['name']
    },
    {
      title: '작업명',
      key: 'taskName',
      ...COLUMN_WIDTH_CONFIG['name']
    },
    {
      title: '워크플로우 인스턴스',
      key: 'processInstanceName',
      ...COLUMN_WIDTH_CONFIG['name']
    },
    {
      title: '작업그룹명',
      key: 'taskGroupName',
      ...COLUMN_WIDTH_CONFIG['name']
    },
    {
      title: '우선순위',
      key: 'priority',
      width: 120
    },
    {
      title: '상태',
      key: 'forceStart',
      ...COLUMN_WIDTH_CONFIG['state']
    },
    {
      title: '큐',
      key: 'inQueue',
      width: 120
    },
    {
      title: '작업상태',
      key: 'status',
      ...COLUMN_WIDTH_CONFIG['state']
    },
    {
      title: '생성일시',
      key: 'createTime',
      ...COLUMN_WIDTH_CONFIG['time']
    },
    {
      title: '수정일시',
      key: 'updateTime',
      ...COLUMN_WIDTH_CONFIG['time']
    },
    {
      title: '액션',
      key: 'actions',
      ...COLUMN_WIDTH_CONFIG['operation'](2),
      render: (row: any) =>
        h(TableAction, {
          row,
          onResetTableData: () => {
            if (variables.page > 1 && variables.tableData.length === 1) {
              variables.page -= 1
            }
            resetTableData()
          },
          onUpdatePriority: (queueId: number, priority: number) => {
            updatePriority(queueId, priority)
          }
        })
    }
  ]

  const variables = reactive({
    tableData: [],
    tableWidth: calculateTableWidth(columns) || DefaultTableWidth,
    page: ref(1),
    pageSize: ref(10),
    groupId: ref(3),
    totalPage: ref(1),
    loadingRef: ref(false)
  })

  const getTableData = (params: any) => {
    if (variables.loadingRef) return
    variables.loadingRef = true
    const taskGroupSearchParams = {
      pageNo: 1,
      pageSize: 2147483647
    }

    Promise.all([
      queryTaskListInTaskGroupQueueById(params),
      queryTaskGroupListPaging(taskGroupSearchParams)
    ]).then(
      (values: any[]) => {
        const taskGroupList = values[1].totalList
        variables.totalPage = values[0].totalPage
        variables.tableData = values[0].totalList.map(
          (item: any, unused: number) => {
            let taskGroupName = ''
            if (taskGroupList) {
              const taskGroup = _.find(taskGroupList, { id: item.groupId })
              if (taskGroup) {
                taskGroupName = taskGroup.name
              }
            }

            item.taskGroupName = taskGroupName
            item.createTime = format(
              parseTime(item.createTime),
              'yyyy-MM-dd HH:mm:ss'
            )
            item.updateTime = format(
              parseTime(item.updateTime),
              'yyyy-MM-dd HH:mm:ss'
            )
            return {
              ...item
            }
          }
        )
      },
      () => {}
    )

    variables.loadingRef = false
  }

  return { getTableData, variables, columns }
}
