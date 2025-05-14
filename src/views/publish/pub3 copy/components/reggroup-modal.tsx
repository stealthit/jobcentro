import { defineComponent } from 'vue'
import styles from './index.module.scss'

const RegGroupModal = defineComponent({
  name: 'RegGroupModal',
  render() {
    return (
      <div class={[styles.regGroupBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">그룸추가/수정</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group">
            <div className="input-label">경로</div>
            <input type='text' value="" />
          </div>
          <div className="input-group">
            <div className="input-label">그룹명</div>
            <input type='text' value="" />
          </div>
          <div className="input-group">
            <div className="input-label">설명</div>
            <textarea value=""></textarea>
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

export default RegGroupModal