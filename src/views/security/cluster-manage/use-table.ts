import { useAsyncState } from '@vueuse/core'
import { reactive, h, ref } from 'vue'
import { format } from 'date-fns'
import { NButton, NPopconfirm, NSpace, NTooltip, NTag, NIcon } from 'naive-ui'
import {
  queryClusterListPaging,
  deleteClusterByCode
} from '@/service/modules/cluster'
import { DeleteOutlined, EditOutlined } from '@vicons/antd'
import type { ClusterRes, ClusterItem } from '@/service/modules/cluster/types'
import { parseTime } from '@/common/common'
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

  const createColumns = (variables: any) => {
    variables.columns = [
      {
        title: '#',
        key: 'index',
        render: (row: any, index: number) => index + 1,
        ...COLUMN_WIDTH_CONFIG['index']
      },
      {
        title: '클러스터명',
        key: 'name',
        className: 'cluster-name',
        ...COLUMN_WIDTH_CONFIG['name']
      },
      {
        title: '클러스터 구성',
        key: 'config',
        ...COLUMN_WIDTH_CONFIG['tag'],
        render: (row: ClusterItem) =>
          h(NSpace, null, {
            default: () => {
              const components = []
              if (row.config) {
                const config = JSON.parse(row.config)
                if (config.yarn) {
                  components.push('yarn')
                }
                if (config.k8s) {
                  components.push('kubernetes')
                }
              }
              return components.map((item: any) =>
                h(
                  NTag,
                  { type: 'success', size: 'small' },
                  { default: () => item }
                )
              )
            }
          })
      },
      {
        title: '클러스터 설명',
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
        key: 'operation',
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

  const handleDelete = (row: any) => {
    deleteClusterByCode({ clusterCode: row.code }).then(() => {
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

  const getTableData = (params: any) => {
    if (variables.loadingRef) return
    variables.loadingRef = true
    const { state } = useAsyncState(
      queryClusterListPaging({ ...params }).then((res: ClusterRes) => {
        variables.tableData = res.totalList.map((item, unused) => {
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
        }) as any
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
