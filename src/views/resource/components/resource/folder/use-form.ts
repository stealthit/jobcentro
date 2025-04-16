import { reactive, ref, unref } from 'vue'
import type { FormRules } from 'naive-ui'
import { IFolderDefaultValue } from '@/views/resource/components/resource/types'

const defaultValue: IFolderDefaultValue = () => ({
  pid: -1,
  type: undefined!,
  name: '',
  description: '',
  currentDir: '/'
})

export function useForm() {
  const resetForm = () => {
    state.folderForm = Object.assign(unref(state.folderForm), defaultValue())
  }

  const state = reactive({
    folderFormRef: ref(),
    folderForm: defaultValue(),
    saving: false,
    rules: {
      name: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (state.folderForm.name === '') {
            return new Error('Please enter name')
          }
        }
      }
    } as FormRules
  })

  return {
    state,
    resetForm
  }
}
