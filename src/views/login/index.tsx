import { defineComponent } from 'vue'
import styles from './index.module.scss'

const login = defineComponent({
  name: 'login',
  render() {
    return (
      <div class={styles.loginWrap}>
        <div class={styles.loginTop}>
          <img src='src/assets/images/top_logo.svg' alt='' />
          <button class='btn-menual'>
            <img class='ic-down' />
            매뉴얼 다운로드
          </button>
        </div>
        <div class={styles.loginBoxWrap}>
          <div class={styles.loginBox}>
            <div class={styles.loginInputBox}>
              <div class='title-h1'>로그인</div>
              <div class={styles.inputWrap}>
                <div class='input-group'>
                  {/* 필수 필드일땐  ic-tit-nece class 추가가*/}
                  <div class='input-label ic-tit-nece'>사용자 아이디</div>
                  <input type='text' placeholder="아이디를 입력하세요." />
                  <div class='err-msg'>Please enter your username</div>
                </div>
                <div class='input-group'>
                  <div class='input-label ic-tit-nece'>비밀번호</div>
                  <input type='text' placeholder="비밀번호를 입력하세요."/>
                  <div class='err-msg'>Please enter your password</div>
                </div>
                <button class={styles.btnLogin}>로그인</button>
              </div>
            </div>
            <img
              src='src/assets/images/img_login.svg'
              alt=''
              width='380'
              height='495'
            />
          </div>
        </div>
        <div class={styles.loginBottom}>2025 © Jobcentro</div>
      </div>
    )
  }
})

export default login
