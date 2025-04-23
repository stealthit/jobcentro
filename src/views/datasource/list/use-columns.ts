import { h } from 'vue'
import {
  NPopover,
  NButton,
  NIcon,
  NPopconfirm,
  NSpace,
  NTooltip
} from 'naive-ui'
import { EditOutlined, DeleteOutlined } from '@vicons/antd'
import JsonHighlight from './json-highlight'
import ButtonLink from '@/components/button-link'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import type { TableColumns } from './types'

export function useColumns(onCallback: Function) {
  const getColumns = (): { columns: TableColumns; tableWidth: number } => {
    const columns = [
      {
        title: '#',
        key: 'index',
        render: (unused, rowIndex) => rowIndex + 1,
        ...COLUMN_WIDTH_CONFIG['index']
      },
      {
        title: '데이터소스명',
        key: 'name',
        ...COLUMN_WIDTH_CONFIG['name']
      },
      {
        title: '관리자',
        key: 'userName',
        ...COLUMN_WIDTH_CONFIG['userName']
      },
      {
        title: '데이터소스 타입',
        key: 'type',
        width: 180
      },
      {
        title: '데이터소스 매개변수',
        key: 'parameter',
        width: 180,
        render: (rowData) => {
          return h(
            NPopover,
            { trigger: 'click' },
            {
              trigger: () =>
                h(ButtonLink, null, {
                  default: () => 'Click to view'
                }),
              default: () => h(JsonHighlight, { rowData })
            }
          )
        }
      },
      {
        title: '설명',
        key: 'note',
        ...COLUMN_WIDTH_CONFIG['note'],
        render: (rowData) => rowData.note || '-'
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
                      onClick: () =>
                        void onCallback(rowData.id, 'edit', rowData)
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
                      onPositiveClick: () =>
                        void onCallback(rowData.id, 'delete'),
                      negativeText: 'Cancel',
                      positiveText: 'Confirm'
                    },
                    {
                      trigger: () =>
                        h(
                          NButton,
                          {
                            circle: true,
                            type: 'error',
                            size: 'small',
                            class: 'btn-delete'
                          },
                          {
                            default: () =>
                              h(NIcon, null, {
                                default: () => h(DeleteOutlined)
                              })
                          }
                        ),
                      default: () => 'Delete?'
                    }
                  ),
                default: () => 'Delete'
              })
            ]
          })
        }
      }
    ] as TableColumns

    return {
      columns,
      tableWidth: calculateTableWidth(columns) || DefaultTableWidth
    }
  }

  return {
    getColumns
  }
}
