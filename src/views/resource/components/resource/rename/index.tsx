import {
  defineComponent,
  toRefs,
  PropType,
  watch,
  getCurrentInstance
} from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'
import Modal from '@/components/modal'
import { useForm } from './use-form'
import { useRename } from './use-rename'
import type { ResourceType } from '@/views/resource/components/resource/types'

const props = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  resourceType: {
    type: String as PropType<ResourceType>,
    default: undefined
  },
  name: {
    type: String as PropType<string>,
    default: ''
  },
  description: {
    type: String as PropType<string>,
    default: ''
  },
  fullName: {
    type: String as PropType<string>,
    default: ''
  },
  userName: {
    type: String as PropType<string>,
    default: ''
  }
}

export default defineComponent({
  name: 'ResourceFileRename',
  props,
  emits: ['updateList', 'update:show'],
  setup(props, ctx) {
    const { state, resetForm } = useForm(
      props.resourceType!,
      props.fullName,
      props.name,
      props.description,
      props.userName
    )
    const { handleRenameFile } = useRename(state)
    const hideModal = () => {
      ctx.emit('update:show', false)
    }

    const handleFile = () => {
      handleRenameFile(ctx.emit, hideModal, resetForm)
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    watch(
      () => props.show,
      () => {
        state.renameForm.fullName = props.fullName
        state.renameForm.name = props.name
        state.renameForm.description = props.description
        state.renameForm.user_name = props.userName
      }
    )

    return { hideModal, handleFile, ...toRefs(state), trim }
  },
  render() {
    return (
      <Modal
        show={this.$props.show}
        title='Rename'
        onCancel={this.hideModal}
        onConfirm={this.handleFile}
        confirmClassName='btn-submit'
        cancelClassName='btn-cancel'
        confirmLoading={this.saving}
      >
        <NForm rules={this.rules} ref='renameFormRef'>
          <NFormItem label='Name' path='name'>
            <NInput
              allowInput={this.trim}
              v-model={[this.renameForm.name, 'value']}
              placeholder='파일명을 입력하세요.'
              class='input-name'
            />
          </NFormItem>
        </NForm>
      </Modal>
    )
  }
})
