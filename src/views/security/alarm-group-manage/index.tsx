import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  toRefs
} from 'vue'
import { NButton, NIcon, NSpace } from 'naive-ui'
import { SearchOutlined } from '@vicons/antd'
import { useTable } from './use-table'
import AlarmGroupModal from './components/alarm-group-modal'
import Card from '@/components/card'
import Search from '@/components/input-search'
import BaseTable from '@/components/base-table'

const alarmGroupManage = defineComponent({
  name: 'alarm-group-manage',
  setup() {
    const { variables, getTableData, createColumns } = useTable()

    const requestData = () => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo: variables.page,
        searchVal: variables.searchVal
      })
    }

    const onUpdatePageSize = () => {
      variables.page = 1
      requestData()
    }

    const onSearch = () => {
      variables.page = 1
      requestData()
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
      onCancelModal,
      onConfirmModal,
      onUpdatePageSize,
      handleModalChange,
      onSearch,
      handlePageChange,
      trim
    }
  },
  render() {
    const {
      onCancelModal,
      onConfirmModal,
      handleModalChange,
      onSearch
    } = this

    return (
      <NSpace vertical>
        <Card>
          <NSpace justify='space-between'>
            <NButton size='small' type='primary' onClick={handleModalChange}>
              {'알람 그룹 생성'}
            </NButton>
            <NSpace>
              <Search
                v-model:value={this.searchVal}
                placeholder={'키워드를 입력해주세요'}
                onSearch={onSearch}
              />
              <NButton size='small' type='primary' onClick={onSearch}>
                <NIcon>
                  <SearchOutlined />
                </NIcon>
              </NButton>
            </NSpace>
          </NSpace>
        </Card>
        {/* <Card title={t('menu.alarm_group_manage')}> */}
          <NSpace vertical>
            {/* <NDataTable
              loading={loadingRef}
              columns={this.columns}
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
                onUpdatePage={requestData}
                onUpdatePageSize={onUpdatePageSize}
              />
            </NSpace> */}
            <BaseTable
              tableHeader={this.columns}            // 헤더
              tableData={this.tableData}            // 현재 페이지의 리스트
              tableItemCount={this.itemCount}       // 전체 페이지 개수
              currentPage={this.currentPage}        // 현재 페이지 
              pageSize={this.pageSize}              // 페이지 사이즈 Default 10
              title="알람 그룹 관리"
              onChangePage={this.handlePageChange}  // 페이지 변경 이벤트
            />
          </NSpace>
        {/* </Card> */}
        <AlarmGroupModal
          showModalRef={this.showModalRef}
          statusRef={this.statusRef}
          row={this.row}
          onCancelModal={onCancelModal}
          onConfirmModal={onConfirmModal}
        />
      </NSpace>
    )
  }
})

export default alarmGroupManage
