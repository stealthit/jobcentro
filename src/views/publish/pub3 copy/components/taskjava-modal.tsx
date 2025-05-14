import { defineComponent } from 'vue'
import styles from './index.module.scss'

const TaskJavaModal = defineComponent({
  name: 'TaskJavaModal',
  render() {
    return (
      <div class={[styles.taskBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">워크플로우 Task - Java</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group">
            <div className="input-label ic-tit-nece">Run Type</div>
            <select class="selectBox">
              <option value="">JAVA</option>
              <option value="">val2</option>
              <option value="">val3</option>
              <option value="">val4</option>
            </select>
          </div> 
          <div className="input-group">
            <div className="input-label">모듈 경로 사용 여부</div>
            <div class="toggleBox">
              {/* input 이 checked 일때 on 상태 */}
              <input type="checkbox" id="toggle1"  class="ck-toggle" hidden /> 

              <label for="toggle1" class="toggleSwitch">
                <span class="toggleButton"></span>
              </label>
            </div>
          </div>          
          <div className="input-group">
            <div className="input-label">Main Arguments</div>
            <textarea placeholder="Please enter main arguments"></textarea>
          </div>          
          <div className="input-group">
            <div className="input-label">Java VM Parameters</div>
            <textarea placeholder="Please enter virtual machine parameters"></textarea>
          </div>         
          <div class="input-group">
            <div class="input-label ic-tit-nece">Script</div>
            {/* sql 문 영역 */}
            <div class={styles.sqlBox}>
              
            </div>
          </div>      
          <div className="input-group">
            <div className="input-label">자원</div>
            <select class="selectBox">
              <option value="">ScriptAlarmFile.sh</option>
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
          <div className="input-group flex-1">
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

export default TaskJavaModal