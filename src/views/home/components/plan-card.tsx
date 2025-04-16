import { defineComponent, PropType } from 'vue'
import Card from '@/components/card'
import Gauge from '@/components/chart/modules/Gauge'

const props = {
  title: {
    type: String as PropType<string>
  }
}

const PlanCard = defineComponent({
  name: 'PlanCard',
  props,
  render() {
    const { title } = this
    
    return (
      <Card title={title}>
        {{
          default: () =>
            <Gauge
              data={(
                70
              ).toFixed(2)}
            />
        }}
      </Card>
    )
  }
})

export default PlanCard
