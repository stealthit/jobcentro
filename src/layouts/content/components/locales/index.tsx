import { defineComponent, ref, PropType } from 'vue'
import { NDropdown, NIcon, NButton } from 'naive-ui'
import styles from './index.module.scss'
import { DownOutlined } from '@vicons/antd'

const Locales = defineComponent({
  name: 'Locales',
  props: {
    localesOptions: {
      type: Array as PropType<any>,
      default: []
    }
  },
  render() {
    return (
      <NDropdown
        trigger='hover'
        show-arrow
      >
        <NButton text>
          <NIcon class={styles.icon}>
            <DownOutlined />
          </NIcon>
        </NButton>
      </NDropdown>
    )
  }
})

export default Locales
