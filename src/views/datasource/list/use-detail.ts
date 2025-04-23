import { reactive } from 'vue'
import {
  queryDataSource,
  createDataSource,
  updateDataSource,
  connectDataSource,
  verifyDataSourceName
} from '@/service/modules/data-source'
import type { IDataSource } from './types'

export function useDetail(getFieldsValue: Function) {
  const status = reactive({
    saving: false,
    testing: false,
    loading: false
  })

  let PREV_NAME: string

  const formatParams = (): IDataSource => {
    const values = getFieldsValue()
    return {
      ...values,
      other: values.other ? JSON.parse(values.other) : null
    }
  }

  const queryById = async (id: number) => {
    if (status.loading) return {}
    status.loading = true
    const dataSourceRes = await queryDataSource(id)
    status.loading = false
    PREV_NAME = dataSourceRes.name
    return dataSourceRes
  }

  const testConnect = async () => {
    if (status.testing) return
    status.testing = true
    try {
      const res = await connectDataSource(formatParams())
      window.$message.success(
        res
          ? res.msg
          : `${'Test Connect'} ${'Success'}`
      )
      status.testing = false
    } catch (err) {
      status.testing = false
    }
  }

  const createOrUpdate = async (id?: number) => {
    const values = getFieldsValue()

    if (status.saving || !values.name) return false
    status.saving = true

    try {
      if (PREV_NAME !== values.name) {
        await verifyDataSourceName({ name: values.name })
      }

      id
        ? await updateDataSource(formatParams(), id)
        : await createDataSource(formatParams())

      status.saving = false
      return true
    } catch (err) {
      status.saving = false
      return false
    }
  }

  return { status, queryById, testConnect, createOrUpdate }
}
