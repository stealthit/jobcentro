import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  toRefs,
  watch
} from 'vue'
import {
  NSpace,
  NInput,
  NSelect,
  NDatePicker,
  NButton,
  NIcon,
  NDataTable,
  NPagination,
  NCascader
} from 'naive-ui'
import { SearchOutlined } from '@vicons/antd'
import { useTable } from './use-table'
import Card from '@/components/card'

const AuditLog = defineComponent({
  name: 'audit-log',
  setup() {
    const {
      variables,
      getTableData,
      createColumns,
      getModelTypeData,
      getOperationTypeData
    } = useTable()

    const requestTableData = () => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo: variables.page,
        modelType: variables.modelType,
        operationType: variables.operationType,
        userName: variables.userName,
        modelName: variables.modelName,
        datePickerRange: variables.datePickerRange
      })
    }

    const onUpdatePageSize = () => {
      variables.page = 1
      requestTableData()
    }

    const onSearch = () => {
      variables.page = 1
      requestTableData()
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    onMounted(() => {
      createColumns(variables)
      getModelTypeData()
      getOperationTypeData()
      requestTableData()
    })

    watch(() => 'koKR', () => {
      createColumns(variables)
    })

    return {
      ...toRefs(variables),
      requestTableData,
      onUpdatePageSize,
      onSearch,
      trim
    }
  },
  render() {
    const { requestTableData, onUpdatePageSize, onSearch, loadingRef } = this

    return (
      <NSpace vertical>
        <Card>
          <NSpace justify='end'>
            <NInput
              allowInput={this.trim}
              v-model={[this.userName, 'value']}
              size='small'
              placeholder='User Name'
              clearable
            />
            <NInput
              allowInput={this.trim}
              v-model={[this.modelName, 'value']}
              size='small'
              placeholder='Model Name'
              clearable
            />
            <NCascader
              v-model={[this.modelType, 'value']}
              multiple
              cascade={false}
              size='small'
              options={this.ModelTypeData}
              placeholder='Model Type'
              style={{ width: '180px' }}
              clearable
              filterable
              value-field='name'
              label-field='name'
              children-field='child'
              show-path={false}
              maxTagCount={1}
            />
            <NSelect
              v-model={[this.operationType, 'value']}
              size='small'
              options={this.OperationTypeData}
              placeholder='Operation Type'
              style={{ width: '180px' }}
              clearable
              filterable
              value-field='name'
              label-field='name'
            />

            <NDatePicker
              v-model={[this.datePickerRange, 'value']}
              type='datetimerange'
              size='small'
              start-placeholder='Start Time'
              end-placeholder='End Time'
              clearable
            />
            <NButton size='small' type='primary' onClick={onSearch}>
              <NIcon>
                <SearchOutlined />
              </NIcon>
            </NButton>
          </NSpace>
        </Card>
        <Card title='Audit Log'>
          <NSpace vertical>
            <NDataTable
              loading={loadingRef}
              columns={this.columns}
              scrollX={this.tableWidth}
              data={this.tableData}
            />
            <NSpace justify='center'>
              <NPagination
                v-model:page={this.page}
                v-model:page-size={this.pageSize}
                page-count={this.totalPage}
                show-size-picker
                page-sizes={[10, 30, 50]}
                show-quick-jumper
                onUpdatePage={requestTableData}
                onUpdatePageSize={onUpdatePageSize}
              />
            </NSpace>
          </NSpace>
        </Card>
      </NSpace>
    )
  }
})

export default AuditLog
