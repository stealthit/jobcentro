import { h, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import type { TableColumns } from 'naive-ui/es/data-table/src/interface'
import { NSpace, NTooltip, NButton, NPopconfirm } from 'naive-ui'
import { EditOutlined, DeleteOutlined } from '@vicons/antd'
import { useAsyncState } from '@vueuse/core'
import {
  queryUdfFuncListPaging,
  deleteUdfFunc
} from '@/service/modules/resources'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import type { IUdfFunctionParam } from './types'

export function useTable() {
  const router: Router = useRouter()

  const variables = reactive({
    columns: [],
    tableWidth: DefaultTableWidth,
    row: {},
    tableData: [],
    // here is id not prefix because udf function is still stored in db
    id: ref(Number(router.currentRoute.value.params.id) || -1),
    fullName: ref(String(router.currentRoute.value.query.prefix || '')),
    page: ref(1),
    pageSize: ref(10),
    searchVal: ref(),
    totalPage: ref(1),
    showRef: ref(false),
    loadingRef: ref(false)
  })

  const createColumns = (variables: any) => {
    variables.columns = [
      {
        title: '#',
        key: 'id',
        render: (_row, index) => index + 1,
        ...COLUMN_WIDTH_CONFIG['index']
      },
      {
        title: 'UDF 함수명',
        key: 'funcName',
        ...COLUMN_WIDTH_CONFIG['name']
      },
      {
        title: '유저명',
        ...COLUMN_WIDTH_CONFIG['userName'],
        key: 'userName'
      },
      {
        title: '클래스명',
        key: 'className',
        ...COLUMN_WIDTH_CONFIG['name']
      },
      {
        title: '타입',
        key: 'type',
        ...COLUMN_WIDTH_CONFIG['type']
      },
      {
        title: '설명',
        key: 'description',
        ...COLUMN_WIDTH_CONFIG['note']
      },
      {
        title: 'Jar 패키지',
        key: 'resourceName',
        ...COLUMN_WIDTH_CONFIG['name']
      },
      {
        title: '수정일시',
        key: 'updateTime',
        ...COLUMN_WIDTH_CONFIG['time']
      },
      {
        title: '운영체제',
        key: 'operation',
        ...COLUMN_WIDTH_CONFIG['operation'](2),
        render: (row) => {
          return h(NSpace, null, {
            default: () => [
              h(
                NTooltip,
                {},
                {
                  trigger: () =>
                    h(
                      NButton,
                      {
                        circle: true,
                        type: 'info',
                        size: 'tiny',
                        class: 'btn-edit',
                        onClick: () => {
                          handleEdit(row)
                        }
                      },
                      {
                        icon: () => h(EditOutlined)
                      }
                    ),
                  default: () => 'Edit'
                }
              ),
              h(
                NPopconfirm,
                {
                  onPositiveClick: () => {
                    handleDelete(row.id, row.fullName)
                  }
                },
                {
                  trigger: () =>
                    h(
                      NTooltip,
                      {},
                      {
                        trigger: () =>
                          h(
                            NButton,
                            {
                              circle: true,
                              type: 'error',
                              size: 'tiny',
                              class: 'btn-delete'
                            },
                            {
                              icon: () => h(DeleteOutlined)
                            }
                          ),
                        default: () => 'Delete'
                      }
                    ),
                  default: () => 'Delete?'
                }
              )
            ]
          })
        }
      }
    ] as TableColumns<any>
    if (variables.tableWidth) {
      variables.tableWidth = calculateTableWidth(variables.columns)
    }
  }

  const getTableData = (params: IUdfFunctionParam) => {
    if (variables.loadingRef) return
    variables.loadingRef = true
    const { state } = useAsyncState(
      queryUdfFuncListPaging({ ...params }).then((res: any) => {
        variables.totalPage = res.totalPage
        variables.tableData = res.totalList.map((item: any) => {
          return { ...item }
        })
        variables.loadingRef = false
      }),
      { total: 0, table: [] }
    )
    return state
  }

  const handleEdit = (row: any) => {
    variables.showRef = true
    variables.row = row
  }

  const handleDelete = (id: number, fullName: string) => {
    /* after deleting data from the current page, you need to jump forward when the page is empty. */
    if (variables.tableData.length === 1 && variables.page > 1) {
      variables.page -= 1
    }

    deleteUdfFunc(id, { fullName: fullName }).then(() =>
      getTableData({
        fullName: variables.fullName,
        id: variables.id,
        pageSize: variables.pageSize,
        pageNo: variables.page,
        searchVal: variables.searchVal
      })
    )
  }

  return {
    variables,
    createColumns,
    getTableData
  }
}
