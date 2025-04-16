import { IEmit } from '../types'
import { useFileStore } from '@/store/file/file'
import { createResource, updateResource } from '@/service/modules/resources'

export function useUpload(state: any) {
  const fileStore = useFileStore()

  const handleUploadFile = async (
    emit: IEmit,
    hideModal: () => void,
    resetForm: () => void
  ) => {
    await state.uploadFormRef.validate()

    if (state.saving) return
    state.saving = true
    try {
      const formData = new FormData()
      formData.append('file', state.uploadForm.file)
      formData.append('type', state.uploadForm.type)
      formData.append('name', state.uploadForm.name)
      formData.append('description', state.uploadForm.description)

      if (state.uploadForm.isReupload) {
        formData.append('user_name', state.uploadForm.user_name)
        formData.append('fullName', state.uploadForm.fullName)
        formData.append('tenantCode', state.uploadForm.user_name)
        await updateResource(formData as any)
      } else {
        // no more pid, as currentDir acts as the pid or parent path right now.
        const currentDir = fileStore.getCurrentDir || '/'
        formData.append('currentDir', currentDir)
        await createResource(formData as any)
      }

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
    handleUploadFile
  }
}
