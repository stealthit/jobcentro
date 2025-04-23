import { reactive, ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import {
  queryAuditLogListPaging,
  queryAuditModelType,
  queryAuditLogOperationType
} from '@/service/modules/audit'
import { format } from 'date-fns'
import { parseTime } from '@/common/common'
import type {
  AuditListRes,
  AuditModelTypeItem,
  AuditOperationTypeItem
} from '@/service/modules/audit/types'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import { sortBy } from 'lodash'

export function useTable() {
  const variables = reactive({
    columns: [],
    tableWidth: DefaultTableWidth,
    tableData: [],
    page: ref(1),
    pageSize: ref(10),
    modelType: ref(null),
    operationType: ref(null),
    ModelTypeData: [],
    OperationTypeData: [],
    userName: ref(null),
    modelName: ref(null),
    datePickerRange: ref(null),
    totalPage: ref(1),
    loadingRef: ref(false)
  })

  const createColumns = (variables: any) => {
    variables.columns = [
      {
        title: '#',
        key: 'index',
        render: (row: any, index: number) => index + 1,
        ...COLUMN_WIDTH_CONFIG['index']
      },
      {
        title: 'User Name',
        key: 'userName',
        ...COLUMN_WIDTH_CONFIG['userName']
      },
      {
        title: 'Model Type',
        key: 'modelType',
        ...COLUMN_WIDTH_CONFIG['type']
      },
      {
        title: 'Model Name',
        key: 'modelName',
        ...COLUMN_WIDTH_CONFIG['name']
      },
      {
        title: 'Operation Type',
        key: 'operation',
        ...COLUMN_WIDTH_CONFIG['type']
      },

      {
        title: 'Description',
        key: 'description',
        ...COLUMN_WIDTH_CONFIG['note']
      },
      {
        title: 'Latency (ms)',
        key: 'latency',
        ...COLUMN_WIDTH_CONFIG['times']
      },
      {
        title: 'Create Time',
        key: 'createTime',
        ...COLUMN_WIDTH_CONFIG['time']
      }
    ]

    if (variables.tableWidth) {
      variables.tableWidth = calculateTableWidth(variables.columns)
    }
  }

  const getModelTypeData = async () => {
    try {
      variables.ModelTypeData = await queryAuditModelType().then(
        (res: AuditModelTypeItem[]) => res || []
      )
    } catch {
      variables.ModelTypeData = []
    }
  }

  const getOperationTypeData = async () => {
    try {
      variables.OperationTypeData = await queryAuditLogOperationType().then(
        (res: AuditOperationTypeItem[]) => sortBy(res, 'name')
      )
    } catch {
      variables.OperationTypeData = []
    }
  }

  const getTableData = (params: any) => {
    if (variables.loadingRef) return
    variables.loadingRef = true
    const data = {
      pageSize: params.pageSize,
      pageNo: params.pageNo,
      modelTypes: params.modelType,
      operationTypes: params.operationType,
      userName: params.userName,
      modelName: params.modelName,
      startDate: params.datePickerRange
        ? format(parseTime(params.datePickerRange[0]), 'yyyy-MM-dd HH:mm:ss')
        : '',
      endDate: params.datePickerRange
        ? format(parseTime(params.datePickerRange[1]), 'yyyy-MM-dd HH:mm:ss')
        : ''
    }

    const { state } = useAsyncState(
      queryAuditLogListPaging(data).then((res: AuditListRes) => {
        variables.totalPage = res.totalPage
        variables.tableData = res.totalList.map((item, unused) => {
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
    createColumns,
    getModelTypeData: getModelTypeData,
    getOperationTypeData
  }
}
