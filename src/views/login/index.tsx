import {
  defineComponent,
  getCurrentInstance,
  toRefs
} from 'vue'
import styles from './index.module.scss'
import {
  NInput,
  NButton,
  NForm,
  NFormItem,
  useMessage,
} from 'naive-ui'
import { useForm } from './use-form'

const login = defineComponent({
  name: 'login',
  setup() {
    window.$message = useMessage()
    const { state } = useForm()

    const trim = getCurrentInstance()?.appContext.config.globalProperties.trim

    return {
      ...toRefs(state),
      trim
    }
  },
  render() {
    return (
      <div class={styles.container}>
        <div class={styles['login-model']}>
          <div class={styles.logo}>
            <div class={styles['logo-img']} />
          </div>
          <div
            class={styles['form-model']}
            v-show={true}
          >
            <NForm rules={this.rules} ref='loginFormRef'>
              <NFormItem
                label='Username'
                label-style={{ color: 'black' }}
                path='userName'
              >
                <NInput
                  allowInput={this.trim}
                  class='input-user-name'
                  type='text'
                  size='large'
                  v-model={[this.loginForm.userName, 'value']}
                  placeholder={'Please enter your username'}
                  autofocus
                />
              </NFormItem>
              <NFormItem
                label={'Password'}
                label-style={{ color: 'black' }}
                path='userPassword'
              >
                <NInput
                  allowInput={this.trim}
                  class='input-password'
                  type='password'
                  size='large'
                  v-model={[this.loginForm.userPassword, 'value']}
                  placeholder={'Please enter your password'}
                />
              </NFormItem>
            </NForm>
            <NButton
              class='btn-login'
              round
              type='info'
              disabled={
                !this.loginForm.userName || !this.loginForm.userPassword
              }
              style={{ width: '100%', background: '#0A52BD'}}
            >
              {'Login'}
            </NButton>
          </div>
        </div>
      </div>
    )
  }
})

export default login
