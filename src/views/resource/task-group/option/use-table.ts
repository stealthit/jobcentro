import { h, reactive, ref } from 'vue'
import { format } from 'date-fns'
import { queryTaskGroupListPaging } from '@/service/modules/task-group'
import { queryProjectCreatedAndAuthorizedByUser } from '@/service/modules/projects'
import TableAction from './components/table-action'
import _ from 'lodash'
import { parseTime } from '@/common/common'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import type { TableColumns } from 'naive-ui/es/data-table/src/interface'

export function useTable(
  updateItem = (
    unusedId: number,
    unusedName: string,
    unusedProjectCode: number,
    unusedGroupSize: number,
    unusedDescription: string,
    unusedStatus: number
  ): void => {},
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
      title: '작업그룹명',
      key: 'name',
      ...COLUMN_WIDTH_CONFIG['name']
    },
    {
      title: '프로젝트명',
      key: 'projectName',
      ...COLUMN_WIDTH_CONFIG['name']
    },
    {
      title: '리소스 풀 사이즈',
      key: 'groupSize',
      width: 160
    },
    {
      title: '사용된 리소스',
      key: 'useSize',
      width: 140
    },
    {
      title: '작업그룹 설명',
      key: 'description',
      ...COLUMN_WIDTH_CONFIG['note']
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
      ...COLUMN_WIDTH_CONFIG['operation'](3),
      render: (row: any) =>
        h(TableAction, {
          row,
          onResetTableData: () => {
            if (variables.page > 1 && variables.tableData.length === 1) {
              variables.page -= 1
            }
            resetTableData()
          },
          onUpdateItem: (
            id: number,
            name: string,
            projectCode: number,
            groupSize: number,
            description: string,
            status: number
          ) => {
            updateItem(id, name, projectCode, groupSize, description, status)
          }
        })
    }
  ]

  const variables = reactive({
    tableData: [],
    tableWidth: calculateTableWidth(columns) || DefaultTableWidth,
    page: ref(1),
    pageSize: ref(10),
    name: ref(null),
    totalPage: ref(1),
    loadingRef: ref(false)
  })

  const getTableData = (params: any) => {
    if (variables.loadingRef) return
    variables.loadingRef = true
    Promise.all([
      queryTaskGroupListPaging(params),
      queryProjectCreatedAndAuthorizedByUser()
    ]).then((values: any[]) => {
      variables.totalPage = values[0].totalPage
      variables.tableData = values[0].totalList.map(
        (item: any, unused: number) => {
          let projectName = ''
          if (values[1]) {
            const project = _.find(values[1], { code: item.projectCode })
            if (project) {
              projectName = project.name
            }
          }

          item.projectName = projectName
          item.createTime = format(
            parseTime(item.createTime),
            'yyyy-MM-dd HH:mm:ss'
          )
          item.updateTime = format(
            parseTime(item.updateTime),
            'yyyy-MM-dd HH:mm:ss'
          )
          item.status = item.status == 'YES' ? 1 : 0
          return {
            ...item
          }
        }
      )
      variables.loadingRef = false
    })
  }

  return { getTableData, variables, columns }
}
