import {
  defineComponent,
  Ref,
  toRefs,
  onMounted,
  toRef,
  watch,
  getCurrentInstance
} from 'vue'
import { NIcon, NSpace, NDataTable, NButton, NPagination } from 'naive-ui'
import { SearchOutlined } from '@vicons/antd'
import { useTable } from './use-table'
import Card from '@/components/card'
import FolderModal from './components/function-modal'
import Search from '@/components/input-search'
import styles from './index.module.scss'

export default defineComponent({
  name: 'function-manage',
  setup() {
    const { variables, createColumns, getTableData } = useTable()

    const requestData = () => {
      getTableData({
        id: variables.id,
        fullName: variables.fullName,
        pageSize: variables.pageSize,
        pageNo: variables.page,
        searchVal: variables.searchVal
      })
    }

    const handleUpdateList = () => {
      requestData()
    }

    const handleChangePageSize = () => {
      variables.page = 1
      requestData()
    }

    const handleSearch = () => {
      variables.page = 1
      requestData()
    }

    const handleShowModal = (showRef: Ref<Boolean>) => {
      showRef.value = true
    }

    const handleCreateFolder = () => {
      variables.row = {}
      handleShowModal(toRef(variables, 'showRef'))
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    watch(() => 'koKR', () => {
      createColumns(variables)
    })

    onMounted(() => {
      createColumns(variables)
      requestData()
    })

    return {
      requestData,
      handleSearch,
      handleUpdateList,
      handleCreateFolder,
      handleChangePageSize,
      ...toRefs(variables),
      trim
    }
  },
  render() {
    const { loadingRef } = this

    return (
      <NSpace vertical>
        <Card>
          <NSpace justify='space-between'>
            <NButton
              type='primary'
              size='small'
              onClick={this.handleCreateFolder}
              class='btn-create-udf-function'
            >
              {'UDF 함수 생성'}
            </NButton>
            <NSpace>
              <Search
                placeholder='키워드 입력'
                v-model:value={this.searchVal}
                onSearch={this.handleSearch}
              />
              <NButton type='primary' size='small' onClick={this.handleSearch}>
                <NIcon>
                  <SearchOutlined />
                </NIcon>
              </NButton>
            </NSpace>
          </NSpace>
        </Card>
        <Card title='UDF 함수'>
          <NSpace vertical>
            <NDataTable
              loading={loadingRef}
              columns={this.columns}
              data={this.tableData}
              striped
              size={'small'}
              class={styles.table}
              row-class-name='items'
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
                onUpdatePage={this.requestData}
                onUpdatePageSize={this.handleChangePageSize}
              />
            </NSpace>
          </NSpace>
        </Card>
        <FolderModal
          v-model:row={this.row}
          v-model:show={this.showRef}
          onUpdateList={this.handleUpdateList}
        />
      </NSpace>
    )
  }
})
