import { defineComponent, getCurrentInstance, toRefs } from 'vue'
import { NButton, NIcon, NSpace, NPagination } from 'naive-ui'
import { SearchOutlined } from '@vicons/antd'
import { useColumns } from './use-columns'
import { useTable } from './use-table'
import UserDetailModal from './components/user-detail-modal'
import AuthorizeModal from './components/authorize-modal'
import PasswordModal from './components/password-modal'
import Card from '@/components/card'
import Search from '@/components/input-search'
import BaseTable from '@/components/base-table'

const UsersManage = defineComponent({
  name: 'user-manage',
  setup() {
    const { state, changePage, updateList, onOperationClick } =
      useTable()
    const { columnsRef } = useColumns(onOperationClick)

    const onAddUser = () => {
      state.detailModalShow = true
      state.currentRecord = null
    }
    const onDetailModalCancel = () => {
      state.detailModalShow = false
    }
    const onAuthorizeModalCancel = () => {
      state.authorizeModalShow = false
    }
    const onPasswordModalCancel = () => {
      state.passwordModalShow = false
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    const handlePageChange = (page: number) => {
      changePage(page);
    };

    return {
      columnsRef,
      ...toRefs(state),
      changePage,
      onAddUser,
      onUpdatedList: updateList,
      onDetailModalCancel,
      onAuthorizeModalCancel,
      onPasswordModalCancel,
      handlePageChange,
      trim
    }
  },
  render() {
    return (
      <NSpace vertical>
        <Card>
          <NSpace justify='space-between'>
            <NButton
              onClick={this.onAddUser}
              type='primary'
              class='btn-create-user'
              size='small'
            >
              {"사용자 생성하기"}
            </NButton>
            <NSpace>
              <Search
                v-model:value={this.searchVal}
                onSearch={this.onUpdatedList}
              />
              <NButton type='primary' size='small' onClick={this.onUpdatedList}>
                <NIcon>
                  <SearchOutlined />
                </NIcon>
              </NButton>
            </NSpace>
          </NSpace>
        </Card>
        {/* <Card title={'사용자 관리'}> */}
        <NSpace vertical>
          {/* <NDataTable
            row-class-name='items'
            columns={this.columnsRef.columns}
            data={this.list}
            loading={this.loading}
            scrollX={this.columnsRef.tableWidth}
          /> */}
          <BaseTable
            tableHeader={this.columnsRef.columns} // 헤더
            tableData={this.list}                 // 현재 페이지의 리스트
            tableItemCount={this.itemCount}       // 전체 데이터 개수
            currentPage={this.page}               // 현재 페이지 
            pageSize={this.pageSize}              // 페이지 사이즈 Default 10
            title="사용자 관리"
            onChangePage={this.handlePageChange}
          />
          {/* <NSpace justify='center'>
            <NPagination
              v-model:page={this.page}
              v-model:page-size={this.pageSize}
              item-count={this.itemCount}
              show-size-picker
              page-sizes={[10, 30, 50]}
              show-quick-jumper
              on-update:page={this.changePage}
              on-update:page-size={this.changePageSize}
            />
          </NSpace> */}
        </NSpace>
        {/* </Card> */}
        <UserDetailModal
          show={this.detailModalShow}
          currentRecord={this.currentRecord}
          onCancel={this.onDetailModalCancel}
          onUpdate={this.onUpdatedList}
        />
        <AuthorizeModal
          show={this.authorizeModalShow}
          type={this.authorizeType}
          userId={this.currentRecord?.id}
          onCancel={this.onAuthorizeModalCancel}
        />
        <PasswordModal
          show={this.passwordModalShow}
          currentRecord={this.currentRecord}
          onCancel={this.onPasswordModalCancel}
        />
      </NSpace>
    )
  }
})

export default UsersManage
