import { defineComponent, ref, PropType, computed, h, inject } from 'vue'
import { NIcon, NButton, NSelect, NDropdown, NTag } from 'naive-ui'
import styles from './index.module.scss'
import { DownOutlined } from '@vicons/antd'
import { useDropDown } from './use-dropdown'
import { useTimezoneStore } from '@/store/timezone/timezone'

const Timezone = defineComponent({
  name: 'Timezone',
  inject: ['reload'],
  props: {
    timezoneOptions: {
      type: Array as PropType<any>,
      default: []
    }
  },
  setup(props) {
    const reload: any = inject('reload')
    const timezoneStore = useTimezoneStore()
    const currentTime =
      props.timezoneOptions.filter(
        (item: { value: string }) => item.value === timezoneStore.getTimezone
      )[0] || {}
    const chooseVal = ref(currentTime.label)

    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const options = [
      {
        label: currentTimeZone,
        key: currentTimeZone
      },
      {
        key: 'header-divider',
        type: 'divider'
      },
      {
        key: 'footer',
        type: 'render',
        render: () => (
          <NSelect
            class={styles['custom-select']}
            filterable
            size='small'
            placeholder={'Choose timeZone'}
            options={props.timezoneOptions}
            onUpdateValue={handleSelect}
          />
        )
      }
    ]

    const renderDropdownLabel = (option: any) => {
      if (option.label === currentTimeZone) {
        return h('div', null, [
          h('span', null, option.label),
          h(
            NTag,
            { type: 'info', size: 'small', style: 'margin-left: 10px' },
            { default: () => 'Local' }
          )
        ])
      } else {
        return option.label
      }
    }

    const optionsVal = computed(() =>
      currentTimeZone === chooseVal.value
        ? options
        : [{ label: chooseVal.value, key: chooseVal.value }, ...options]
    )

    const { handleSelect } = useDropDown(chooseVal, reload)

    return { handleSelect, chooseVal, optionsVal, renderDropdownLabel }
  },
  render() {
    return (
      <NDropdown
        trigger='hover'
        show-arrow
        options={this.optionsVal}
        on-select={this.handleSelect}
        renderLabel={this.renderDropdownLabel}
      >
        <NButton text>
          {this.chooseVal}
          <NIcon class={styles.icon}>
            <DownOutlined />
          </NIcon>
        </NButton>
      </NDropdown>
    )
  }
})

export default Timezone
