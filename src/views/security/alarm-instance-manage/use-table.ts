import { reactive } from 'vue'
import {
  queryAlertPluginInstanceListPaging,
  deleteAlertPluginInstance
} from '@/service/modules/alert-plugin'
import { format } from 'date-fns'
import { parseTime } from '@/common/common'
import type { IRecord } from './types'

export function useTable() {
  const data = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    searchVal: '',
    list: [],
    loading: false
  })

  const getList = async () => {
    if (data.loading) return
    data.loading = true

    const { totalList, total } = await queryAlertPluginInstanceListPaging({
      pageNo: data.page,
      pageSize: data.pageSize,
      searchVal: data.searchVal
    })
    data.loading = false
    if (!totalList) throw Error()
    data.list = totalList.map((record: IRecord) => {
      record.createTime = record.createTime
        ? format(parseTime(record.createTime), 'yyyy-MM-dd HH:mm:ss')
        : ''
      record.updateTime = record.updateTime
        ? format(parseTime(record.updateTime), 'yyyy-MM-dd HH:mm:ss')
        : ''
      return record
    })

    data.itemCount = total
  }

  const updateList = () => {
    if (data.list.length === 1 && data.page > 1) {
      --data.page
    }
    getList()
  }

  const deleteRecord = async (id: number) => {
    const ignored = await deleteAlertPluginInstance(id)
    updateList()
  }

  const changePage = (page: number) => {
    data.page = page
    getList()
  }

  const changePageSize = (pageSize: number) => {
    data.page = 1
    data.pageSize = pageSize
    getList()
  }

  return { data, changePage, changePageSize, deleteRecord, updateList }
}
