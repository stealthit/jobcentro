import { defineComponent, toRefs, PropType, getCurrentInstance } from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'
import Modal from '@/components/modal'
import { noSpace } from '@/utils/trim'
import { useForm } from './use-form'
import { useFolder } from './use-folder'
import { ResourceType } from '@/views/resource/components/resource/types'

const props = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  resourceType: {
    type: String as PropType<ResourceType>,
    default: undefined
  }
}

export default defineComponent({
  name: 'ResourceFileFolder',
  props,
  emits: ['updateList', 'update:show'],
  setup(props, ctx) {
    const { state, resetForm } = useForm()
    const { handleCreateFolder } = useFolder(state)

    const hideModal = () => {
      ctx.emit('update:show')
    }

    const handleFolder = () => {
      state.folderForm.type = props.resourceType!
      handleCreateFolder(ctx.emit, hideModal, resetForm)
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    return {
      hideModal,
      handleFolder,
      ...toRefs(state),
      trim
    }
  },
  render() {
    return (
      <Modal
        show={this.$props.show}
        title='폴더 생성'
        onCancel={this.hideModal}
        onConfirm={this.handleFolder}
        confirmClassName='btn-submit'
        cancelClassName='btn-cancel'
        confirmLoading={this.saving}
      >
        <NForm rules={this.rules} ref='folderFormRef'>
          <NFormItem label='폴더명' path='name'>
            <NInput
              allowInput={noSpace}
              v-model={[this.folderForm.name, 'value']}
              placeholder='폴더명을 입력하세요.'
              class='input-directory-name'
            />
          </NFormItem>
        </NForm>
      </Modal>
    )
  }
})
