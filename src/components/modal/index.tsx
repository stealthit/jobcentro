import { defineComponent, PropType, renderSlot, Ref } from 'vue'
import { NModal, NCard, NButton, NSpace } from 'naive-ui'
import ButtonLink from '@/components/button-link'
import styles from './index.module.scss'
import type { LinkOption } from '@/components/modal/types'

const props = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  title: {
    type: String as PropType<string>,
    required: true
  },
  cancelText: {
    type: String as PropType<string>
  },
  cancelShow: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  confirmShow: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  confirmText: {
    type: String as PropType<string>
  },
  confirmClassName: {
    type: String as PropType<string>,
    default: ''
  },
  cancelClassName: {
    type: String as PropType<string>,
    default: ''
  },
  confirmDisabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  confirmLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  autoFocus: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  headerLinks: {
    type: Object as PropType<Ref<Array<LinkOption>>>,
    default: [] as LinkOption[]
  }
}

const Modal = defineComponent({
  name: 'Modal',
  props,
  emits: ['cancel', 'confirm', 'jumpLink', 'maskClick'],
  setup(props, ctx) {
    const onCancel = () => {
      ctx.emit('cancel')
    }

    const onConfirm = () => {
      ctx.emit('confirm')
    }

    const onMaskClick = () => {
      ctx.emit('maskClick')
    }

    return { onCancel, onConfirm, onMaskClick }
  },
  render() {
    const {
      $slots,
      onCancel,
      onConfirm,
      onMaskClick,
      confirmDisabled,
      confirmLoading
    } = this

    return (
      <NModal
        v-model={[this.show, 'show']}
        class={styles.container}
        mask-closable={false}
        auto-focus={this.autoFocus}
        onMaskClick={onMaskClick}
      >
        <NCard
          title={this.title}
          class={styles['modal-card']}
          contentStyle={{ overflowY: 'auto' }}
        >
          {{
            default: () => renderSlot($slots, 'default'),
            'header-extra': () => (
              <NSpace justify='end'>
                {this.headerLinks.value &&
                  this.headerLinks.value
                    .filter((item: any) => item.show)
                    .map((item: any) => {
                      return (
                        <ButtonLink
                          onClick={item.action}
                          disabled={item.disabled}
                        >
                          {{
                            default: () => item.text,
                            icon: () => item.icon()
                          }}
                        </ButtonLink>
                      )
                    })}
              </NSpace>
            ),
            footer: () => (
              <NSpace justify='end'>
                {this.cancelShow && (
                  <NButton
                    class={[this.cancelClassName, 'btn-cancel']}
                    quaternary
                    size='small'
                    onClick={onCancel}
                  >
                    {this.cancelText || 'Cancel'}
                  </NButton>
                )}
                {/* TODO: Add left and right slots later */}
                {renderSlot($slots, 'btn-middle')}
                {this.confirmShow && (
                  <NButton
                    class={[this.confirmClassName, 'btn-submit']}
                    type='info'
                    size='small'
                    onClick={onConfirm}
                    disabled={confirmDisabled}
                    loading={confirmLoading}
                  >
                    {this.confirmText || 'Confirm'}
                  </NButton>
                )}
              </NSpace>
            )
          }}
        </NCard>
      </NModal>
    )
  }
})

export default Modal
