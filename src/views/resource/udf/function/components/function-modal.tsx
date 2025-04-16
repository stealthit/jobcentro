import {
  defineComponent,
  toRefs,
  PropType,
  watch,
  onMounted,
  ref,
  getCurrentInstance
} from 'vue'
import {
  NUpload,
  NIcon,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NRadio,
  NTreeSelect,
  NButton,
  NRadioGroup
} from 'naive-ui'
import { CloudUploadOutlined } from '@vicons/antd'
import Modal from '@/components/modal'
import { useForm } from './use-form'
import { useModal } from './use-modal'
import type { IUdf } from '../types'

const props = {
  row: {
    type: Object as PropType<IUdf>,
    default: {}
  },
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}

export default defineComponent({
  name: 'ResourceFileFolder',
  props,
  emits: ['update:show', 'updateList'],
  setup(props, ctx) {
    const treeRef = ref()
    const { state, uploadState } = useForm()

    const {
      variables,
      handleCreateFunc,
      handleRenameFunc,
      getUdfList,
      handleUploadFile
    } = useModal(state, uploadState, ctx)

    const hideModal = () => {
      ctx.emit('update:show')
    }

    const handleCreate = () => {
      handleCreateFunc()
    }

    const handleRename = () => {
      handleRenameFunc(props.row.id)
    }

    const handleUpload = () => {
      uploadState.uploadForm.currentDir = `/${treeRef.value.selectedOption?.fullName}`
      handleUploadFile()
    }

    const customRequest = ({ file }: any) => {
      uploadState.uploadForm.name = file.name
      uploadState.uploadForm.file = file.file
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    onMounted(() => {
      getUdfList()
    })

    watch(
      () => props.row,
      () => {
        variables.uploadShow = false
        state.functionForm.type = props.row.type || 'HIVE'
        state.functionForm.funcName = props.row.funcName
        state.functionForm.className = props.row.className
        state.functionForm.resourceId = props.row.resourceId || -1
        state.functionForm.fullName = props.row.resourceName || ''
        state.functionForm.description = props.row.description
      }
    )
    return {
      treeRef,
      hideModal,
      handleCreate,
      handleRename,
      customRequest,
      handleUpload,
      ...toRefs(state),
      ...toRefs(uploadState),
      ...toRefs(variables),
      trim
    }
  },
  render() {
    return (
      <Modal
        show={this.$props.show}
        title={
          this.row.id
            ? '사용자 정의 함수 수정'
            : '사용자 정의 함수 생성'
        }
        onCancel={this.hideModal}
        onConfirm={this.row.id ? this.handleRename : this.handleCreate}
        confirmClassName='btn-submit'
        cancelClassName='btn-cancel'
        confirmLoading={this.saving}
      >
        <NForm rules={this.rules} ref='functionFormRef'>
          <NFormItem label='Type' path='type'>
            <NRadioGroup
              v-model={[this.functionForm.type, 'value']}
              name='type'
              class='radio-function-type'
            >
              <NRadio value='HIVE'>HIVE UDF</NRadio>
            </NRadioGroup>
          </NFormItem>
          <NFormItem
            label='함수명'
            path='funcName'
          >
            <NInput
              allowInput={this.trim}
              v-model={[this.functionForm.funcName, 'value']}
              placeholder='함수명을 입력하세요.'
              class='input-function-name'
            />
          </NFormItem>
          <NFormItem
            label='패키지명을 입력하세요.'
            path='className'
          >
            <NInput
              allowInput={this.trim}
              v-model={[this.functionForm.className, 'value']}
              placeholder='패키지명을 입력하세요.'
              class='input-class-name'
            />
          </NFormItem>
          <NFormItem
            label='사용자 정의 함수 리소스'
            path='fullName'
          >
            <NInputGroup>
              <NTreeSelect
                options={this.udfResourceList}
                label-field='name'
                key-field='fullName'
                check-strategy='child'
                v-model={[this.functionForm.fullName, 'value']}
                placeholder='사용자 정의 함수 리소스를 선택하세요.'
                defaultValue={this.functionForm.fullName}
                disabled={this.uploadShow}
                showPath={false}
                class='btn-udf-resource-dropdown'
              />
              <NButton
                type='primary'
                ghost
                onClick={() => (this.uploadShow = !this.uploadShow)}
              >
                {'업로드 리소스'}
              </NButton>
            </NInputGroup>
          </NFormItem>
          {this.uploadShow && (
            <NForm rules={this.uploadRules} ref='uploadFormRef'>
              <NFormItem
                label='UDF resources directory'
                path='pid'
                show-feedback={false}
                style={{ marginBottom: '5px' }}
              >
                <NTreeSelect
                  ref='treeRef'
                  options={this.udfResourceDirList}
                  label-field='fullName'
                  key-field='id'
                  v-model={[this.uploadForm.pid, 'value']}
                  placeholder='Please select UDF resources directory'
                  defaultValue={this.uploadForm.pid}
                />
              </NFormItem>
              <NFormItem
                label=' '
                show-feedback={false}
                style={{ marginBottom: '5px' }}
              >
                <NInputGroup>
                  <NInput
                    allowInput={this.trim}
                    v-model={[this.uploadForm.name, 'value']}
                    placeholder='Please enter name'
                  />
                  <NUpload
                    v-model={[this.uploadForm.file, 'value']}
                    customRequest={this.customRequest}
                    showFileList={false}
                    style={{ width: 'auto' }}
                  >
                    <NButton>
                      {'Upload'}
                      <NIcon>
                        <CloudUploadOutlined />
                      </NIcon>
                    </NButton>
                  </NUpload>
                </NInputGroup>
              </NFormItem>
              <NFormItem
                label=' '
                path='description'
                show-feedback={false}
                style={{ marginBottom: '5px' }}
              >
                <NInput
                  type='textarea'
                  v-model={[this.uploadForm.description, 'value']}
                  placeholder='Please enter description'
                  class='input-description'
                />
              </NFormItem>
              <NFormItem label=' '>
                <NButton onClick={this.handleUpload}>
                  {'Upload UDF Resources'}
                </NButton>
              </NFormItem>
            </NForm>
          )}

          <NFormItem
            label='Instructions'
            path='description'
          >
            <NInput
              type='textarea'
              v-model={[this.functionForm.description, 'value']}
              placeholder='Please enter a instructions'
              class='input-description'
            />
          </NFormItem>
        </NForm>
      </Modal>
    )
  }
})
