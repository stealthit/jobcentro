import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  toRefs,
  watch
} from 'vue'
import { NButton, NIcon, NDataTable, NPagination, NSpace } from 'naive-ui'
import { SearchOutlined } from '@vicons/antd'
import { useColumns } from './use-columns'
import { useTable } from './use-table'
import { DefaultTableWidth } from '@/common/column-width-config'
import Card from '@/components/card'
import Search from '@/components/input-search'
import DetailModal from './detail'
import type { TableColumns } from './types'
import SourceModal from './source-modal'

const list = defineComponent({
  name: 'list',
  setup() {
    const showDetailModal = ref(false)
    const showSourceModal = ref(false)
    const selectType = ref('MYSQL')
    const selectId = ref()
    const columns = ref({
      columns: [] as TableColumns,
      tableWidth: DefaultTableWidth
    })
    const { data, changePage, changePageSize, deleteRecord, updateList } =
      useTable()

    const { getColumns } = useColumns(
      (id: number, type: 'edit' | 'delete', row?: any) => {
        if (type === 'edit') {
          showDetailModal.value = true
          selectId.value = id
          selectType.value = row.type
        } else {
          deleteRecord(id)
        }
      }
    )

    const onCreate = () => {
      selectId.value = null
      showSourceModal.value = true
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    const handleSelectSourceType = (value: string) => {
      selectType.value = value
      showSourceModal.value = false
      showDetailModal.value = true
    }

    const handleSourceModalOpen = () => {
      showSourceModal.value = true
    }

    const handleSourceModalClose = () => {
      showSourceModal.value = false
    }

    onMounted(() => {
      changePage(1)
      columns.value = getColumns()
    })

    watch(() => 'koKR', () => {
      columns.value = getColumns()
    })

    return {
      showDetailModal,
      showSourceModal,
      id: selectId,
      columns,
      ...toRefs(data),
      changePage,
      changePageSize,
      onCreate,
      onUpdatedList: updateList,
      trim,
      handleSelectSourceType,
      selectType,
      handleSourceModalOpen,
      handleSourceModalClose
    }
  },
  render() {
    const {
      id,
      showDetailModal,
      showSourceModal,
      columns,
      list,
      page,
      pageSize,
      itemCount,
      loading,
      changePage,
      changePageSize,
      onCreate,
      onUpdatedList,
      handleSelectSourceType,
      selectType,
      handleSourceModalOpen,
      handleSourceModalClose
    } = this

    return (
      <NSpace vertical>
        <Card>
          <NSpace justify='space-between'>
            <NButton
              onClick={onCreate}
              type='primary'
              size='small'
              class='btn-create-data-source'
            >
              {'데이터소스 생성'}
            </NButton>
            <NSpace justify='end' wrap={false}>
              <Search
                v-model:value={this.searchVal}
                placeholder='키워드 입력'
                onSearch={onUpdatedList}
              />
              <NButton type='primary' size='small' onClick={onUpdatedList}>
                <NIcon>
                  <SearchOutlined />
                </NIcon>
              </NButton>
            </NSpace>
          </NSpace>
        </Card>
        <Card title='데이터 소스'>
          <NSpace vertical>
            <NDataTable
              row-class-name='data-source-items'
              columns={columns.columns}
              data={list}
              loading={loading}
              striped
              scrollX={columns.tableWidth}
            />
            <NSpace justify='center'>
              <NPagination
                page={page}
                page-size={pageSize}
                item-count={itemCount}
                show-quick-jumper
                show-size-picker
                page-sizes={[10, 30, 50]}
                on-update:page={changePage}
                on-update:page-size={changePageSize}
              />
            </NSpace>
          </NSpace>
        </Card>
        <SourceModal
          show={showSourceModal}
          onChange={handleSelectSourceType}
          onMaskClick={handleSourceModalClose}
        ></SourceModal>
        <DetailModal
          show={showDetailModal}
          id={id}
          selectType={selectType}
          onCancel={() => void (this.showDetailModal = false)}
          onUpdate={onUpdatedList}
          onOpen={handleSourceModalOpen}
        />
      </NSpace>
    )
  }
})
export default list
