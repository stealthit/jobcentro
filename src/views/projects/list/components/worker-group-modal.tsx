import {
  defineComponent,
  getCurrentInstance,
  PropType,
  toRefs,
  watch
} from 'vue'
import { NTransfer } from 'naive-ui'
import Modal from '@/components/modal'
import styles from '@/views/security/user-manage/index.module.scss'
import { useWorkerGroup } from '@/views/projects/list/components/use-worker-group'

const props = {
  showModalRef: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  row: {
    type: Object as PropType<any>,
    default: {}
  }
}

const WorkerGroupModal = defineComponent({
  name: 'WorkerGroupModal',
  props,
  emits: ['cancelModal', 'confirmModal'],
  setup(props, ctx) {
    const { variables, handleValidate, initAssignedWorkerGroups } =
      useWorkerGroup(props, ctx)

    const cancelModal = () => {
      ctx.emit('cancelModal', props.showModalRef)
    }

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    const confirmModal = () => {
      handleValidate()
    }

    watch(
      () => props.showModalRef,
      () => {
        if (props.showModalRef) {
          initAssignedWorkerGroups(props.row.code)
        }
      }
    )

    return { ...toRefs(variables), cancelModal, confirmModal, trim }
  },
  render() {
    return (
      <Modal
        title='Worker 그룹'
        show={this.showModalRef}
        onConfirm={this.confirmModal}
        onCancel={this.cancelModal}
        confirmClassName='btn-submit'
        cancelClassName='btn-cancel'
      >
        <NTransfer
          virtualScroll
          class={styles.transfer}
          options={this.model.workerGroupOptions}
          v-model:value={this.model.assignedWorkerGroups}
        />
      </Modal>
    )
  }
})

export default WorkerGroupModal
