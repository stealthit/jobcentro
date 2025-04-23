import { defineComponent, PropType, toRefs } from 'vue'
import { NSpace } from 'naive-ui'
import Modal from '@/components/modal'
import { useForm, datasourceTypeList } from './use-form'
import styles from './index.module.scss'

const props = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  id: {
    type: Number as PropType<number>
  }
}

const SourceModal = defineComponent({
  name: 'SourceModal',
  props,
  emits: ['change', 'maskClick'],
  setup(props, ctx) {
    const { state } = useForm(props.id)

    const handleTypeSelect = (value: string) => {
      ctx.emit('change', value)
    }

    const handleMaskClick = () => {
      ctx.emit('maskClick')
    }

    return {
      ...toRefs(state),
      handleTypeSelect,
      handleMaskClick
    }
  },
  render() {
    const { show, handleTypeSelect, handleMaskClick } = this

    return (
      <Modal
        class='dialog-source-modal'
        show={show}
        title='데이터소스 구분'
        cancelShow={false}
        confirmShow={false}
        onMaskClick={handleMaskClick}
      >
        {{
          default: () => (
            <div class={styles.content}>
              <NSpace>
                {datasourceTypeList.map((item) => (
                  <div
                    class={[styles.itemBox, `${item.label}-box`]}
                    onClick={() => handleTypeSelect(item.value)}
                  >
                    {item.label}
                  </div>
                ))}
              </NSpace>
            </div>
          )
        }}
      </Modal>
    )
  }
})

export default SourceModal
