import { defineComponent } from 'vue'
import styles from './index.module.scss'

const TaskPythonModal = defineComponent({
  name: 'TaskPythonModal',
  render() {
    return (
      <div class={[styles.taskBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">워크플로우 Task - Java</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">                 
          <div class="input-group">
            <div class="input-label ic-tit-nece">Script</div>
            {/* sql 문 영역 */}
            <div class={styles.sqlBox}>
              
            </div>
          </div>      
          <div className="input-group">
            <div className="input-label">자원</div>
            <select class="selectBox" required>
              <option value="" selected disabled hidden>선택해주세요</option>
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
              <option value="">val4</option>
            </select>
          </div>       
          <div class="input-group">
            <div class="input-label">사용자 정의 변수</div>
            <div class={styles.withBtn}>
              <ul class={styles.fieldListBox}>
                <li><input type="text" name="" id="" value="biz_date" /></li>
                <li>
                  <select class="selectBox">
                    <option value="">IN</option>
                    <option value="">val2</option>
                  </select>
                </li>
                <li>
                  <select class="selectBox">
                    <option value="">VARCHAR</option>
                    <option value="">val2</option>
                  </select>
                </li>
                <li><input type="text" name="" id="" value="20250326" /></li>                
              </ul>
              <div class={styles.btnBox}>
                <button className="btn-ic-trash"></button>
                <button className="btn-ic-add"></button>
              </div>
            </div>
          </div>  
          <div className="input-group">
            <div className="input-label">선행작업</div>
            <select class="selectBox" required>
              <option value="" selected disabled hidden>선택해주세요</option>
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
              <option value="">val4</option>
            </select>
          </div> 
        </div>
        <div class="modalBottom">
          <button class="modalBtnCancel">Cancel</button>
          <button class="modalBtnConfirm">Confirm</button>
        </div>
      </div>
    )
  }
})

export default TaskPythonModal