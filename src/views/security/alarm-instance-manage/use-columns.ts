import { h } from 'vue'
import { NButton, NIcon, NPopconfirm, NSpace, NTooltip } from 'naive-ui'
import { EditOutlined, DeleteOutlined } from '@vicons/antd'
import type { TableColumns } from './types'

export function useColumns(onCallback: Function) {
  const getColumns = (): TableColumns => {
    return [
      {
        title: '#',
        key: 'index',
        render: (rowData, rowIndex) => rowIndex + 1
      },
      {
        title: '알람 인스턴스명',
        key: 'instanceName'
      },
      {
        title: '알람 인스턴스 유형',
        key: 'instanceType'
      },
      {
        title: '알람 플러그인명',
        key: 'alertPluginName'
      },
      {
        title: '생성 일시',
        key: 'createTime'
      },
      {
        title: '수정 일시',
        key: 'updateTime'
      },
      {
        title: '액션',
        key: 'operation',
        width: 150,
        render: (rowData) => {
          return h(NSpace, null, {
            default: () => [
              h(NTooltip, null, {
                trigger: () =>
                  h(
                    NButton,
                    {
                      circle: true,
                      type: 'info',
                      size: 'small',
                      onClick: () => void onCallback(rowData, 'edit')
                    },
                    {
                      default: () =>
                        h(NIcon, null, { default: () => h(EditOutlined) })
                    }
                  ),
                default: () => 'Edit'
              }),
              h(NTooltip, null, {
                trigger: () =>
                  h(
                    NPopconfirm,
                    {
                      onPositiveClick: () => void onCallback(rowData, 'delete'),
                      negativeText: '취소',
                      positiveText: '확인'
                    },
                    {
                      trigger: () =>
                        h(
                          NButton,
                          {
                            circle: true,
                            type: 'error',
                            size: 'small'
                          },
                          {
                            default: () =>
                              h(NIcon, null, {
                                default: () => h(DeleteOutlined)
                              })
                          }
                        ),
                      default: () => 'Delete'
                    }
                  ),
                default: () => 'Delete?'
              })
            ]
          })
        }
      }
    ]
  }

  return {
    getColumns
  }
}
