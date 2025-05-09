import {
  defineComponent,
  toRefs,
  onMounted,
  getCurrentInstance
} from 'vue'
import { NButton, NIcon, NSpace } from 'naive-ui'
import { useTable } from './use-table'
import { SearchOutlined } from '@vicons/antd'
import TenantModal from './components/tenant-modal'
import Card from '@/components/card'
import Search from '@/components/input-search'
import BaseTable from '@/components/base-table'

const tenementManage = defineComponent({
  name: 'tenement-manage',
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

    const onCancelModal = () => {
      variables.showModalRef = false
    }

    const onConfirmModal = () => {
      variables.showModalRef = false
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

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    const handlePageChange = (page: number) => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo: page,
        searchVal: variables.searchVal
      });
    };

    onMounted(() => {
      createColumns(variables)
      requestData()
    })

    return {
      ...toRefs(variables),
      requestData,
      handleModalChange,
      onCancelModal,
      onConfirmModal,
      handleSearch,
      handleChangePageSize,
      handlePageChange,
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
              class='btn-create-tenant'
            >
              {'테넌트 생성'}
            </NButton>
            <NSpace>
              <Search
                v-model:value={this.searchVal}
                placeholder={'키워드를 입력해주세요'}
                onSearch={this.handleSearch}
              />
              <NButton size='small' type='primary' onClick={this.handleSearch}>
                <NIcon>
                  <SearchOutlined />
                </NIcon>
              </NButton>
            </NSpace>
          </NSpace>
        </Card>
        {/* <Card title={'테넌트 관리'}> */}
          <NSpace vertical>
            {/* <NDataTable
              loading={loadingRef}
              columns={this.columns}
              data={this.tableData}
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
            </NSpace> */}
            <BaseTable
              tableHeader={this.columns}            // 헤더
              tableData={this.tableData}            // 현재 페이지의 리스트
              tableItemCount={this.itemCount}       // 전체 페이지 개수
              currentPage={this.currentPage}        // 현재 페이지 
              pageSize={this.pageSize}              // 페이지 사이즈 Default 10
              title="테넌트 관리"
              onChangePage={this.handlePageChange}  // 페이지 변경 이벤트
            />
          </NSpace>
        {/* </Card> */}
        <TenantModal
          showModalRef={this.showModalRef}
          statusRef={this.statusRef}
          row={this.row}
          onCancelModal={this.onCancelModal}
          onConfirmModal={this.onConfirmModal}
        />
      </NSpace>
    )
  }
})

export default tenementManage
