import { IEmit } from '../types'
import { updateResource } from '@/service/modules/resources'

export function useRename(state: any) {
  const handleRenameFile = async (
    emit: IEmit,
    hideModal: () => void,
    resetForm: () => void
  ) => {
    await state.renameFormRef.validate()
    if (state.saving) return
    state.saving = true
    try {
      await updateResource({
        ...state.renameForm,
        tenantCode: state.renameForm.user_name
      })
      window.$message.success('Success')
      state.saving = false
      emit('updateList')
      hideModal()
      resetForm()
    } catch (err) {
      state.saving = false
    }
  }

  return {
    handleRenameFile
  }
}
