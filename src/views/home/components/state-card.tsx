import { defineComponent, PropType } from 'vue'
import { useTable } from '../use-table'
import { NDataTable, NDatePicker, NGrid, NGi } from 'naive-ui'
import PieChart from '@/components/chart/modules/Pie'
import Card from '@/components/card'
import type { StateTableData, StateChartData } from '../types'

const props = {
  title: {
    type: String as PropType<string>
  },
  date: {
    type: Array as PropType<Array<any>>
  },
  tableData: {
    type: Array as PropType<Array<StateTableData>>,
    default: () => []
  },
  chartData: {
    type: Array as PropType<Array<StateChartData>>,
    default: () => []
  },
  loadingRef: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}

const StateCard = defineComponent({
  name: 'StateCard',
  props,
  emits: ['updateDatePickerValue'],
  setup(props, ctx) {
    const onUpdateDatePickerValue = (val: any) => {
      ctx.emit('updateDatePickerValue', val)
    }

    return { onUpdateDatePickerValue }
  },
  render() {
    const {
      title,
      date,
      tableData,
      chartData,
      onUpdateDatePickerValue,
      loadingRef
    } = this
    const { columnsRef } = useTable()
    return (
      <Card title={title} style={{ minHeight: '820px' }}>
        {{
          default: () => (
            <NGrid x-gap={12} cols={2}>
              <NGi>{chartData.length > 0 && <PieChart data={chartData} />}</NGi>
              <NGi>
                {tableData && (
                  <NDataTable
                    loading={loadingRef}
                    columns={columnsRef}
                    data={tableData}
                    striped
                    size={'small'}
                  />
                )}
              </NGi>
            </NGrid>
          ),
          'header-extra': () => (
            <NDatePicker
              default-value={date}
              onUpdateValue={onUpdateDatePickerValue}
              size='small'
              type='datetimerange'
              clearable
            />
          )
        }}
      </Card>
    )
  }
})

export default StateCard
