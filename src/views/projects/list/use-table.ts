import { h, reactive, ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import ButtonLink from '@/components/button-link'
import { queryProjectListPaging } from '@/service/modules/projects'
import { parseTime } from '@/common/common'
import { deleteProject } from '@/service/modules/projects'
import { format } from 'date-fns'
import { useRouter } from 'vue-router'
import {
  NButton,
  NEllipsis,
  NIcon,
  NPopconfirm,
  NSpace,
  NTooltip
} from 'naive-ui'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import type { Router } from 'vue-router'
import type { ProjectRes } from '@/service/modules/projects/types'
import { ControlOutlined, DeleteOutlined, EditOutlined } from '@vicons/antd'
import { useUserStore } from '@/store/user/user'
import { UserInfoRes } from '@/service/modules/users/types'

export function useTable() {
  const router: Router = useRouter()

  const userStore = useUserStore()
  const userInfo = userStore.getUserInfo as UserInfoRes
  const IS_ADMIN = userInfo.userType === 'ADMIN_USER'

  const handleEdit = (row: any) => {
    variables.showModalRef = true
    variables.statusRef = 1
    variables.row = row
  }

  const handleAssign = (row: any) => {
    variables.showWorkerGroupModalRef = true
    variables.row = row
  }

  const handleDelete = (row: any) => {
    deleteProject(row.code).then(() => {
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
        render: (unused: any, index: number) => index + 1,
        ...COLUMN_WIDTH_CONFIG['index']
      },
      {
        title: '프로젝트명',
        key: 'name',
        className: 'project-name',
        ...COLUMN_WIDTH_CONFIG['linkName'],
        render: (row: { code: string; name: any }) =>
          h(
            ButtonLink,
            {
              onClick: () => {
                router.push({
                  path: `/projects/${row.code}`,
                  query: { projectName: row.name }
                })
              }
            },
            {
              default: () =>
                h(
                  NEllipsis,
                  COLUMN_WIDTH_CONFIG['linkEllipsis'],
                  () => row.name
                )
            }
          )
      },
      {
        title: '관리자',
        key: 'userName',
        ...COLUMN_WIDTH_CONFIG['userName']
      },
      {
        title: '워크플로우 개수',
        key: 'defCount',
        width: 120,
        ellipsis: {
          tooltip: true
        }
      },
      {
        title: '실행중인 인스턴스 개수',
        key: 'instRunningCount',
        width: 200,
        ellipsis: {
          tooltip: true
        }
      },
      {
        title: '설명',
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
                  default: () => 'Edit',
                }
              ),
              IS_ADMIN &&
                h(
                  NTooltip,
                  {
                    trigger: 'hover'
                  },
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
                            handleAssign(row)
                          }
                        },
                        {
                          icon: () => h(NIcon, null, () => h(ControlOutlined))
                        }
                      ),
                    default: () => 'Worker Group'
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
                        default: () => 'Delete',
                      }
                    ),
                  default: () => 'Delete?',
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
    searchVal: ref(''),
    totalPage: ref(1),
    showModalRef: ref(false),
    showWorkerGroupModalRef: ref(false),
    statusRef: ref(0),
    row: {},
    loadingRef: ref(false)
  })

  const getTableData = (params: any) => {
    if (variables.loadingRef) return
    variables.loadingRef = true
    const { state } = useAsyncState(
      queryProjectListPaging(params).then((res: ProjectRes) => {
        variables.totalPage = res.totalPage
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
        variables.loadingRef = false
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
