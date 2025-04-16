import { IEmit } from '../types'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { useFileStore } from '@/store/file/file'
import { createDirectory } from '@/service/modules/resources'

export function useFolder(state: any) {
  const router: Router = useRouter()
  const fileStore = useFileStore()

  const handleCreateFolder = async (
    emit: IEmit,
    hideModal: () => void,
    resetForm: () => void
  ) => {
    await state.folderFormRef.validate()

    if (state.saving) return
    state.saving = true

    try {
      const pid = router.currentRoute.value.params.id || -1
      const currentDir = fileStore.getCurrentDir || '/'
      await createDirectory({
        ...state.folderForm,
        ...{ pid, currentDir }
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
    handleCreateFolder
  }
}
