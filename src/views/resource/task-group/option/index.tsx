import {
  ref,
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  getCurrentInstance
} from 'vue'
import { NButton, NIcon, NDataTable, NPagination, NSpace } from 'naive-ui'
import Card from '@/components/card'
import { SearchOutlined } from '@vicons/antd'
import { useTable } from './use-table'
import FormModal from './components/form-modal'
import Search from '@/components/input-search'

const taskGroupOption = defineComponent({
  name: 'taskGroupOption',
  setup() {
    const { variables, getTableData } = useTable()
    const showModalRef = ref(false)
    const modelStatusRef = ref(0)

    const searchParamRef = ref()

    const updateItemData = reactive({
      id: 0,
      name: '',
      projectCode: 0,
      groupSize: 0,
      status: 1,
      description: ''
    })

    const requestData = () => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo: variables.page,
        name: variables.name
      })
    }

    const resetTableData = () => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo: variables.page,
        name: variables.name
      })
    }

    const onCancel = () => {
      showModalRef.value = false
    }

    const onConfirm = () => {
      showModalRef.value = false
      resetTableData()
    }

    const onUpdatePageSize = () => {
      variables.page = 1
      resetTableData()
    }

    const updateItem = (
      id: number,
      name: string,
      projectCode: number,
      groupSize: number,
      description: string
    ) => {
      modelStatusRef.value = 1
      showModalRef.value = true
      updateItemData.id = id
      updateItemData.name = name
      updateItemData.projectCode = projectCode
      updateItemData.groupSize = groupSize
      updateItemData.description = description
    }

    const onSearch = () => {
      resetTableData()
    }

    const onCreate = () => {
      modelStatusRef.value = 0
      showModalRef.value = true
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    onMounted(() => {
      requestData()
    })

    return {
      ...toRefs(variables),
      onCreate,
      onSearch,
      searchParamRef,
      resetTableData,
      onUpdatePageSize,
      updateItem,
      showModalRef,
      modelStatusRef,
      onCancel,
      onConfirm,
      updateItemData,
      trim
    }
  },
  render() {
    const {
      showModalRef,
      modelStatusRef,
      onCancel,
      onConfirm,
      updateItemData,
      resetTableData,
      onUpdatePageSize,
      updateItem,
      onSearch,
      loadingRef
    } = this

    const { columns } = useTable(updateItem, resetTableData)

    return (
      <NSpace vertical>
        <Card>
          <NSpace justify='space-between'>
            <NButton
              size='small'
              type={'primary'}
              onClick={() => this.onCreate()}
            >
              {'작업그룹 생성'}
            </NButton>
            <NSpace>
              <Search
                placeholder='Please enter keywords'
                v-model:value={this.name}
                onSearch={this.onSearch}
              ></Search>
              <NButton size='small' type='primary' onClick={onSearch}>
                <NIcon>
                  <SearchOutlined />
                </NIcon>
              </NButton>
            </NSpace>
          </NSpace>
        </Card>
        <Card title='작업그룹 옵션'>
          <NSpace vertical>
            <NDataTable
              loading={loadingRef}
              columns={columns}
              size={'small'}
              data={this.tableData}
              striped
              scrollX={this.tableWidth}
            />
            <NSpace justify='center'>
              <NPagination
                v-model:page={this.page}
                v-model:page-size={this.pageSize}
                page-count={this.totalPage}
                show-size-picker
                page-sizes={[10, 30, 50]}
                show-quick-jumper
                onUpdatePage={resetTableData}
                onUpdatePageSize={onUpdatePageSize}
              />
            </NSpace>
          </NSpace>
        </Card>
        {showModalRef && (
          <FormModal
            show={showModalRef}
            onCancel={onCancel}
            onConfirm={onConfirm}
            data={updateItemData}
            status={modelStatusRef}
          />
        )}
      </NSpace>
    )
  }
})

export default taskGroupOption
