import { reactive, ref, unref } from 'vue'
import type { FormRules } from 'naive-ui'
import { IUploadDefaultValue } from '@/views/resource/components/resource/types'

const defaultValue: IUploadDefaultValue = () => ({
  isReupload: false,
  fullName: '',
  user_name: '',
  name: '',
  file: '',
  type: undefined!,
  pid: -1,
  currentDir: '/'
})

export function useForm() {
  const resetForm = () => {
    state.uploadForm = Object.assign(unref(state.uploadForm), defaultValue())
  }

  const state = reactive({
    uploadFormRef: ref(),
    uploadFormNameRef: ref(),
    uploadForm: defaultValue(),
    saving: false,
    rules: {
      name: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (state.uploadForm.name === '') {
            return new Error('Please enter name')
          }
        }
      },
      file: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (state.uploadForm.file === '') {
            return new Error('Please enter the resource content')
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
