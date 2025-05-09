import { useAsyncState } from '@vueuse/core'
import {
  queryTenantListPaging,
  deleteTenantById
} from '@/service/modules/tenants'
import { reactive, h, ref } from 'vue'
import { NButton, NIcon, NPopconfirm, NSpace, NTooltip } from 'naive-ui'
import { DeleteOutlined, EditOutlined } from '@vicons/antd'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'

export function useTable() {
  const handleEdit = (row: any) => {
    variables.showModalRef = true
    variables.statusRef = 1
    variables.row = row
  }

  const handleDelete = (row: any) => {
    deleteTenantById(row.id).then(() => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo:
          variables.tableData.length === 1 && variables.page > 1
            ? variables.page - 1
            : variables.page,
        searchVal: variables.searchVal
      })
    })
  }

  const createColumns = (variables: any) => {
    variables.columns = [
      {
        title: '#',
        key: 'index',
        render: (row: any, index: number) => index + 1,
        ...COLUMN_WIDTH_CONFIG['index']
      },
      {
        title: '테넌트 코드',
        key: 'tenantCode',
        className: 'tenant-code',
        ...COLUMN_WIDTH_CONFIG['userName']
      },
      {
        title: '테넌트 설명',
        key: 'description',
        ...COLUMN_WIDTH_CONFIG['note']
      },
      {
        title: '큐 이름',
        key: 'queueName',
        ...COLUMN_WIDTH_CONFIG['name']
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
        render(row: any) {
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
                        size: 'small',
                        class: 'edit',
                        onClick: () => {
                          handleEdit(row)
                        }
                      },
                      {
                        icon: () =>
                          h(NIcon, null, { default: () => h(EditOutlined) })
                      }
                    ),
                  default: () => 'Edit'
                }
              ),
              h(
                NPopconfirm,
                {
                  onPositiveClick: () => {
                    handleDelete(row)
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
                              size: 'small',
                              class: 'delete'
                            },
                            {
                              icon: () =>
                                h(NIcon, null, {
                                  default: () => h(DeleteOutlined)
                                })
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
    ]
    if (variables.tableWidth) {
      variables.tableWidth = calculateTableWidth(variables.columns)
    }
  }

  const variables = reactive({
    columns: [],
    tableWidth: DefaultTableWidth,
    tableData: [],
    page: ref(1),
    pageSize: ref(10),
    searchVal: ref(null),
    totalPage: ref(1),
    itemCount: ref(0),
    currentPage: ref(1),
    showModalRef: ref(false),
    statusRef: ref(0),
    row: {},
    loadingRef: ref(false)
  })

  const getTableData = (params: any) => {
    if (variables.loadingRef) return
    variables.loadingRef = true
    const { state } = useAsyncState(
      queryTenantListPaging({ ...params }).then((res: any) => {
        variables.tableData = res.totalList.map((item: any, unused: number) => {
          return {
            ...item
          }
        })
        variables.totalPage = res.totalPage
        variables.loadingRef = false        
        variables.itemCount = res.total
        variables.currentPage = res.currentPage
      }),
      {}
    )

    return state
  }

  return {
    variables,
    getTableData,
    createColumns
  }
}
