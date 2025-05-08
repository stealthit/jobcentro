import { h, ref, watch, onMounted } from 'vue'
import {
  NSpace,
  NTooltip,
  NButton,
  NIcon,
  NTag,
  NDropdown,
  NPopconfirm
} from 'naive-ui'
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  KeyOutlined
} from '@vicons/antd'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import type { TableColumns, InternalRowData } from './types'
import { useUserStore } from '@/store/user/user'
import { UserInfoRes } from './types'

export function useColumns(onCallback: Function) {
  const userStore = useUserStore()
  const userInfo = userStore.getUserInfo as UserInfoRes
  const IS_ADMIN = userInfo.userType === 'ADMIN_USER'

  const columnsRef = ref({
    columns: [] as TableColumns,
    tableWidth: DefaultTableWidth
  })

  const createColumns = () => {
    const columns = [
      {
        title: 'No',
        key: 'index',
        render: (rowData: InternalRowData, rowIndex: number) => rowIndex + 1,
        ...COLUMN_WIDTH_CONFIG['index']
      },
      {
        title: '사용자명',
        key: 'userName',
        className: 'name',
        ...COLUMN_WIDTH_CONFIG['userName']
      },
      {
        title: '사용자 유형',
        key: 'userType',
        render: (rowData: InternalRowData) =>
          rowData.userType === 'GENERAL_USER'
            ? '일반 사용자'
            : '관리자',
        ...COLUMN_WIDTH_CONFIG['type']
      },
      {
        title: '테넌트 코드',
        key: 'tenantCode',
        ...COLUMN_WIDTH_CONFIG['name']
      },
      {
        title: 'Queue',
        key: 'queue',
        width: 120
      },
      {
        title: 'Email',
        key: 'email',
        ...COLUMN_WIDTH_CONFIG['name']
      },
      {
        title: '전화번호',
        key: 'phone',
        width: 140
      },
      {
        title: '상태',
        key: 'state',
        ...COLUMN_WIDTH_CONFIG['state'],
        render: (rowData: any, unused: number) =>
          h(
            NTag,
            { type: rowData.state === 1 ? 'success' : 'error' },
            {
              default: () =>
                rowData.state === 1 ? 'Enabled' : 'Disabled'
            }
          )
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
        title: 'Operation',
        key: 'operation',
        ...COLUMN_WIDTH_CONFIG['operation'](4),
        render: (rowData: InternalRowData, unused: number) => {
          return h(NSpace, null, {
            default: () => [
              h(
                NDropdown,
                {
                  trigger: 'click',
                  options: [
                    {
                      label: 'Project',
                      key: 'authorize_project'
                    },
                    {
                      label: 'Resource',
                      key: 'authorize_resource'
                    },
                    {
                      label: 'Datasource',
                      key: 'authorize_datasource'
                    },
                    { 
                      label: 'UDF Function', 
                      key: 'authorize_udf' 
                    },
                    {
                      label: 'Namespace',
                      key: 'authorize_namespace'
                    }
                  ],
                  onSelect: (key) =>
                    void onCallback({ rowData, key }, 'authorize')
                },
                () =>
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
                            class: 'authorize'
                          },
                          {
                            icon: () => h(NIcon, null, () => h(UserOutlined))
                          }
                        ),
                      default: () => 'Authorize'
                    }
                  )
              ),
              h(
                NTooltip,
                { trigger: 'hover' },
                {
                  trigger: () =>
                    h(
                      NButton,
                      {
                        circle: true,
                        type: 'info',
                        size: 'small',
                        class: 'edit',
                        onClick: () => void onCallback({ rowData }, 'edit')
                      },
                      () => h(NIcon, null, () => h(EditOutlined))
                    ),
                  default: () => 'Edit'
                }
              ),
              IS_ADMIN &&
                h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          circle: true,
                          type: 'error',
                          size: 'small',
                          class: 'edit',
                          onClick: () =>
                            void onCallback({ rowData }, 'resetPassword')
                        },
                        () => h(NIcon, null, () => h(KeyOutlined))
                      ),
                    default: () => 'Reset Password'
                  }
                ),
              h(
                NPopconfirm,
                {
                  onPositiveClick: () => void onCallback({ rowData }, 'delete')
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
                  default: () => 'Are you sure to delete?'
                }
              )
            ]
          })
        }
      }
    ]
    columnsRef.value = {
      columns,
      tableWidth: calculateTableWidth(columns)
    }
  }

  onMounted(() => {
    createColumns()
  })

  watch(() => 'koKR', () => {
    createColumns()
  })

  return {
    columnsRef,
    createColumns
  }
}
