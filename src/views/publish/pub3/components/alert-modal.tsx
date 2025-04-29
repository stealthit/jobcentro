import { defineComponent } from 'vue'
import styles from './index.module.scss'

const AlertModal = defineComponent({
  name: 'AlertModal',
  render() {
    return (
      <div class={[styles.alertBox,"modalWrap conBox"]}>
        <button class="close"></button>        
        <div class={[styles.modalBody,"modalBody"]}>
          <div class={styles.imgBox}>
            {/* 메세지 종류에 따라 img class 를 지정
                확인 메세지 :  ic-confirm-48
                주의 메세지 :  ic-caution-48
                실패 메세지 :  ic-fail-48
                안내 메세지 :  ic-info-48
             */}
            <img src="" alt="" class="ic-confirm-48" />
          </div>
            {/* 2 Line 이상시 li 태그로 추가 */}
          <ul class={styles.textBox}>
            <li>확인 관련 메세지가 표시 됩니다</li>
            {/* <li>확인 관련 메세지가 표시 됩니다</li> */}
          </ul>
        </div>
        <div class="modalBottom center">
          <button class="modalBtnCancel">Cancel</button>
          <button class="modalBtnConfirm">Confirm</button>
        </div>
      </div>
    )
  }
})

export default AlertModal