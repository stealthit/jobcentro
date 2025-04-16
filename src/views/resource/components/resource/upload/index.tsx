import {
  defineComponent,
  toRefs,
  PropType,
  getCurrentInstance,
  watch
} from 'vue'
import { NButton, NForm, NFormItem, NInput, NUpload } from 'naive-ui'

import Modal from '@/components/modal'
import { useForm } from './use-form'
import { useUpload } from './use-upload'
import { ResourceType } from '@/views/resource/components/resource/types'

const props = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  resourceType: {
    type: String as PropType<ResourceType>,
    default: undefined
  },
  isReupload: {
    type: Boolean as PropType<boolean>,
    default: false
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
  name: 'ResourceFileUpload',
  props,
  emits: ['updateList', 'update:show'],
  setup(props, ctx) {
    const { state, resetForm } = useForm()
    const { handleUploadFile } = useUpload(state)

    const hideModal = () => {
      resetForm()
      ctx.emit('update:show')
    }

    const customRequest = ({ file }: any) => {
      state.uploadForm.name = file.name
      state.uploadForm.file = file.file
      state.uploadFormRef.validate()
    }

    const handleFile = () => {
      handleUploadFile(ctx.emit, hideModal, resetForm)
    }

    const removeFile = () => {
      state.uploadForm.name = ''
      state.uploadForm.file = ''
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    watch(
      () => props.show,
      () => {
        state.uploadForm.type = props.resourceType!
        state.uploadForm.isReupload = props.isReupload
        if (props.isReupload && props.show) {
          state.uploadForm.fullName = props.fullName
          state.uploadForm.name = props.name
          state.uploadForm.user_name = props.userName
        }
      }
    )

    return {
      hideModal,
      customRequest,
      handleFile,
      removeFile,
      ...toRefs(state),
      trim
    }
  },
  render() {
    return (
      <Modal
        show={this.$props.show}
        title='파일 업로드'
        onCancel={this.hideModal}
        onConfirm={this.handleFile}
        confirmClassName='btn-submit'
        cancelClassName='btn-cancel'
        confirmLoading={this.saving}
      >
        <NForm rules={this.rules} ref='uploadFormRef'>
          <NFormItem
            label='파일명'
            path='name'
            ref='uploadFormNameRef'
          >
            <NInput
              allowInput={this.trim}
              v-model={[this.uploadForm.name, 'value']}
              placeholder='파일명을 입력하세요.'
              class='input-file-name'
            />
          </NFormItem>
          <NFormItem label='파일 업로드' path='file'>
            <NUpload
              v-model={[this.uploadForm.file, 'value']}
              customRequest={this.customRequest}
              class='btn-upload'
              max={1}
              onRemove={this.removeFile}
            >
              <NButton>{'파일 업로드'}</NButton>
            </NUpload>
          </NFormItem>
        </NForm>
      </Modal>
    )
  }
})
