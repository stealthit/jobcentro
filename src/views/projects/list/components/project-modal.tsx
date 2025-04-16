import {
  defineComponent,
  getCurrentInstance,
  PropType,
  toRefs,
  watch
} from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'
import { useForm } from './use-form'
import Modal from '@/components/modal'
import { useUserStore } from '@/store/user/user'
import type { UserInfoRes } from '@/service/modules/users/types'

const props = {
  showModalRef: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  statusRef: {
    type: Number as PropType<number>,
    default: 0
  },
  row: {
    type: Object as PropType<any>,
    default: {}
  }
}

const ProjectModal = defineComponent({
  name: 'ProjectModal',
  props,
  emits: ['cancelModal', 'confirmModal'],
  setup(props, ctx) {
    const { variables, handleValidate } = useForm(props, ctx)

    const userStore = useUserStore()

    const cancelModal = () => {
      if (props.statusRef === 0) {
        variables.model.projectName = ''
        variables.model.description = ''
      } else {
        variables.model.userName = props.row.userName
        variables.model.projectName = props.row.name
        variables.model.description = props.row.description
      }
      ctx.emit('cancelModal', props.showModalRef)
    }

    const confirmModal = () => {
      handleValidate(props.statusRef)
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    watch(
      () => props.statusRef,
      () => {
        if (props.statusRef === 0) {
          variables.model.projectName = ''
          variables.model.userName = (
            userStore.getUserInfo as UserInfoRes
          ).userName
          variables.model.description = ''
        } else {
          variables.model.projectName = props.row.name
          variables.model.userName = props.row.userName
          variables.model.description = props.row.description
        }
      }
    )

    watch(
      () => props.row,
      () => {
        variables.model.projectName = props.row.name
        variables.model.userName = props.row.userName
        variables.model.description = props.row.description
      }
    )

    return { ...toRefs(variables), cancelModal, confirmModal, trim }
  },
  render() {
    return (
      <Modal
        title={
          this.statusRef === 0
            ? '프로젝트 생성'
            : '프로젝트 수정'
        }
        show={this.showModalRef}
        onConfirm={this.confirmModal}
        onCancel={this.cancelModal}
        confirmDisabled={!this.model.projectName || !this.model.userName}
        confirmClassName='btn-submit'
        cancelClassName='btn-cancel'
        confirmLoading={this.saving}
      >
        <NForm rules={this.rules} ref='projectFormRef'>
          <NFormItem label='프로젝트명' path='projectName'>
            <NInput
              //allowInput={this.trim}
              v-model={[this.model.projectName, 'value']}
              placeholder='프로젝트 명을 입력하세요.'
              class='input-project-name'
            />
          </NFormItem>
          <NFormItem label='관리자' path='userName'>
            <NInput
              //allowInput={this.trim}
              disabled={true}
              v-model={[this.model.userName, 'value']}
              placeholder='관리자 아이디를 입력하세요.'
            />
          </NFormItem>
          <NFormItem
            label='프로젝트 설명'
            path='description'
          >
            <NInput
              v-model={[this.model.description, 'value']}
              type='textarea'
              placeholder='프로젝트에 대한 설명을 입력하세요.'
            />
          </NFormItem>
        </NForm>
      </Modal>
    )
  }
})

export default ProjectModal
