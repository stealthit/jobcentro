import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  toRefs
} from 'vue'
import { NButton, NIcon, NSpace } from 'naive-ui'
import DetailModal from './detail'
import Card from '@/components/card'
import { SearchOutlined } from '@vicons/antd'
import { useUserInfo } from './use-userinfo'
import { useColumns } from './use-columns'
import { useTable } from './use-table'
import type { IRecord } from './types'
import Search from '@/components/input-search'
import BaseTable from '@/components/base-table'

const AlarmInstanceManage = defineComponent({
  name: 'alarm-instance-manage',
  setup() {
    const showDetailModal = ref(false)
    const currentRecord = ref()
    const columns = ref()
    const { IS_ADMIN } = useUserInfo()
    const { data, changePage, changePageSize, deleteRecord, updateList } =
      useTable()

    const { getColumns } = useColumns(
      (record: IRecord, type: 'edit' | 'delete') => {
        if (type === 'edit') {
          showDetailModal.value = true
          currentRecord.value = record
        } else {
          deleteRecord(record.id)
        }
      }
    )

    const onCreate = () => {
      currentRecord.value = null
      showDetailModal.value = true
    }

    const onCloseModal = () => {
      showDetailModal.value = false
      currentRecord.value = {}
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    onMounted(() => {
      columns.value = getColumns()
      changePage(1)
    })

    return {
      IS_ADMIN,
      showDetailModal,
      currentRecord: currentRecord,
      columns,
      ...toRefs(data),
      changePage,
      changePageSize,
      onCreate,
      onCloseModal,
      onUpdatedList: updateList,
      trim
    }
  },
  render() {
    const {
      IS_ADMIN,
      currentRecord,
      showDetailModal,
      columns,
      list,
      page,
      pageSize,
      itemCount,
      changePage,
      onCreate,
      onUpdatedList,
      onCloseModal
    } = this

    return (
      <NSpace vertical>
        <Card>
          {{
            default: () => (
              <NSpace justify='space-between'>
                {this.IS_ADMIN && (
                  <NButton onClick={onCreate} type='primary' size='small'>
                    {'알람 인스턴스 생성'}
                  </NButton>
                )}
                <NSpace justify='end' wrap={false}>
                  <Search
                    v-model:value={this.searchVal}
                    placeholder={'키워드를 입력해주세요'}
                    onSearch={onUpdatedList}
                  />
                  <NButton type='primary' size='small' onClick={onUpdatedList}>
                    <NIcon>
                      <SearchOutlined />
                    </NIcon>
                  </NButton>
                </NSpace>
              </NSpace>
            )
          }}
        </Card>
        {/* <Card title={t('menu.alarm_instance_manage')}> */}
          <NSpace vertical>
            {/* <NDataTable
              columns={columns}
              data={list}
              loading={loading}
              striped
            />
            <NSpace justify='center'>
              <NPagination
                page={page}
                page-size={pageSize}
                item-count={itemCount}
                show-quick-jumper
                on-update:page={changePage}
                on-update:page-size={changePageSize}
              />
            </NSpace> */}
            {/* columns 로딩 시간이 있어서 하기 구문 추가 */}
            {columns && list ? (
              <BaseTable
                tableHeader={columns}             // 헤더
                tableData={list}                  // 현재 페이지의 리스트
                tableItemCount={itemCount}        // 전체 페이지 개수
                currentPage={page}                // 현재 페이지 
                pageSize={pageSize}               // 페이지 사이즈 Default 10
                title="알람 인스턴스 관리"
                onChangePage={changePage}         // 페이지 변경 이벤트
            />) : null}   
          </NSpace>
        {/* </Card> */}
        {IS_ADMIN && (
          <DetailModal
            show={showDetailModal}
            currentRecord={currentRecord}
            onCancel={onCloseModal}
            onUpdate={onUpdatedList}
          />
        )}
      </NSpace>
    )
  }
})
export default AlarmInstanceManage
