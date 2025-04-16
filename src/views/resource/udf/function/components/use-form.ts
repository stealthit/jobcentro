import { reactive, ref } from 'vue'
import type { FormRules } from 'naive-ui'

export const useForm = () => {
  const state = reactive({
    functionFormRef: ref(),
    functionForm: {
      type: 'HIVE',
      funcName: '',
      className: '',
      argTypes: '',
      database: '',
      description: '',
      resourceId: -1,
      fullName: ''
    },
    saving: false,
    rules: {
      type: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (!state.functionForm.type) {
            return new Error('Please enter name')
          }
        }
      },
      funcName: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (!state.functionForm.funcName) {
            return new Error('Please enter name')
          }
        }
      },
      className: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (!state.functionForm.className) {
            return new Error('Please enter name')
          }
        }
      },
      resourceId: {
        required: false,
        trigger: ['input', 'blur'],
        validator() {
          if (state.functionForm.resourceId === -1) {
            return new Error('Please enter name')
          }
        }
      },
      fullName: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (state.functionForm.fullName == '') {
            return new Error('Please enter name')
          }
        }
      }
    } as FormRules
  })

  const uploadState = reactive({
    uploadFormRef: ref(),
    uploadForm: {
      name: '',
      file: '',
      description: '',
      pid: -1,
      currentDir: '/'
    },
    uploadRules: {
      pid: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (uploadState.uploadForm.pid === -1) {
            return new Error('Please enter name')
          }
        }
      }
    } as FormRules
  })

  return {
    state,
    uploadState
  }
}
