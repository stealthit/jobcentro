import { defineComponent } from 'vue'
import styles from './index.module.scss'

const ScheTimeModal = defineComponent({
  name: 'ScheTimeModal',
  render() {
    return (
      <div class={[styles.schedateBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">스케줄 시간</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
         <div className="input-group">
            <div className="input-label ic-tit-nece">Workflow Name</div>
            <input type="time" value="00:00" />
          </div>            
        </div>
        <div class="modalBottom">
          <button class="btnType1 modalBtnCancel">취소</button>
          <button class="btnType2 modalBtnConfirm">확인</button>
        </div>
      </div>
    )
  }
})

export default ScheTimeModal