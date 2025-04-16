import { reactive, ref } from 'vue'
import type { FormRules } from 'naive-ui'

export function useForm() {
  const state = reactive({
    loginFormRef: ref(),
    loginForm: {
      userName: '',
      userPassword: '',
      ssoLoginUrl: ''
    },
    rules: {
      userName: {
        trigger: ['input', 'blur'],
        validator() {
          if (state.loginForm.userName === '') {
            return new Error('Please enter your username')
          }
        }
      },
      userPassword: {
        trigger: ['input', 'blur'],
        validator() {
          if (state.loginForm.userPassword === '') {
            return new Error('Please enter your password')
          }
        }
      }
    } as FormRules
  })

  return {
    state
  }
}
