import type { TableColumns } from 'naive-ui/es/data-table/src/interface'

export function useTable() {

  const columnsRef: TableColumns<any> = [
    { title: '#', key: 'index', render: (row, index) => index + 1 },
    { title: 'Number', key: 'number' },
    { title: 'State', key: 'state' }
  ]

  return {
    columnsRef
  }
}
