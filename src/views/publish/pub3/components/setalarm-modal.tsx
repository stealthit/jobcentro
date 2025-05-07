import { defineComponent } from 'vue'
import styles from './index.module.scss'

const SetAlarmModal = defineComponent({
  name: 'SetAlarmModal',
  render() {
    return (
      <div class={[styles.setAlarmBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">이벤트 알림설정</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group">
            <div className="input-label">알림 전송 상태</div>
            <select class="selectBox">
              <option value="">알림없음</option>
              <option value="">성공 시</option>
              <option value="">실패 시</option>
              <option value="">항상</option>
            </select>
          </div> 
          <div className="input-group">
            <div className="input-label">항목2</div>
            <select class="selectBox">
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
              <option value="">val4</option>
            </select>
          </div>
          <div className="input-group">
            <div className="input-label">항목3</div>
            <input type="text" value="" />
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

export default SetAlarmModal