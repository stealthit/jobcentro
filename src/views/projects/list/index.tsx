import { SearchOutlined } from '@vicons/antd'
import { NButton, NDataTable, NIcon, NPagination, NSpace } from 'naive-ui'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  toRefs,
  watch
} from 'vue'
import { useTable } from './use-table'
import Card from '@/components/card'
import Search from '@/components/input-search'
import ProjectModal from './components/project-modal'
import WorkerGroupModal from '@/views/projects/list/components/worker-group-modal'

const list = defineComponent({
  name: 'list',
  setup() {
    const { variables, getTableData, createColumns } = useTable()

    const requestData = () => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo: variables.page,
        searchVal: variables.searchVal
      })
    }

    const handleModalChange = () => {
      variables.showModalRef = true
      variables.statusRef = 0
    }

    const handleSearch = () => {
      variables.page = 1
      requestData()
    }

    const onClearSearch = () => {
      variables.page = 1
      getTableData({
        pageSize: variables.pageSize,
        pageNo: variables.page
      })
    }

    const onCancelModal = () => {
      variables.showModalRef = false
    }

    const onConfirmModal = () => {
      variables.showModalRef = false
      requestData()
    }

    const onCancelWorkerGroupModal = () => {
      variables.showWorkerGroupModalRef = false
    }

    const onConfirmWorkerGroupModal = () => {
      variables.showWorkerGroupModalRef = false
      requestData()
    }

    const handleChangePageSize = () => {
      variables.page = 1
      requestData()
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    onMounted(() => {
      createColumns(variables)
      requestData()
    })

    watch(() => 'koKR', () => {
      createColumns(variables)
    })

    return {
      ...toRefs(variables),
      requestData,
      handleModalChange,
      handleSearch,
      onCancelModal,
      onConfirmModal,
      onCancelWorkerGroupModal,
      onConfirmWorkerGroupModal,
      onClearSearch,
      handleChangePageSize,
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
              size='small'
              onClick={this.handleModalChange}
              type='primary'
              class='btn-create-project'
            >
              {'프로젝트 생성'}
            </NButton>
            <NSpace>
              <Search
                v-model:value={this.searchVal}
                placeholder='프로젝트 명'
                onSearch={this.handleSearch}
                onClear={this.onClearSearch}
              />

              <NButton size='small' type='primary' onClick={this.handleSearch}>
                <NIcon>
                  <SearchOutlined />
                </NIcon>
              </NButton>
            </NSpace>
          </NSpace>
        </Card>
        <Card title='프로젝트 목록'>
          <NSpace vertical>
            <NDataTable
              loading={loadingRef}
              columns={this.columns}
              data={this.tableData}
              scrollX={this.tableWidth}
              row-class-name='items'
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
        <ProjectModal
          showModalRef={this.showModalRef}
          statusRef={this.statusRef}
          row={this.row}
          onCancelModal={this.onCancelModal}
          onConfirmModal={this.onConfirmModal}
        />
        <WorkerGroupModal
          showModalRef={this.showWorkerGroupModalRef}
          row={this.row}
          onCancelModal={this.onCancelWorkerGroupModal}
          onConfirmModal={this.onConfirmWorkerGroupModal}
        />
      </NSpace>
    )
  }
})

export default list
