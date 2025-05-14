import { defineComponent } from 'vue'
import styles from './index.module.scss'

const TaskHTTPModal = defineComponent({
  name: 'TaskHTTPModal',
  render() {
    return (
      <div class={[styles.taskBox,styles.http,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">워크플로우 Task - HTTP</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group flex-1">
            <div className="input-label ic-tit-nece">Http Url</div>
            <input type='text' value="http://localhost:12345/dolphinscheduler/ui/view/login/index.html" />
          </div> 
          <div className="input-group flex-1">
            <div className="input-label">Http Method</div>
            <select class="selectBox">
              <option value="">POST</option>
              <option value="">val2</option>
              <option value="">val3</option>
              <option value="">val4</option>
            </select>
          </div>          
          <div class="input-group">
            <div class="input-label">Http Parameters</div>
            <div class={styles.withBtn}>
              <ul class={styles.fieldListBox}>
                <li><input type="text" name="" id="" value="userName" /></li>                
                <li>
                  <select class="selectBox">
                    <option value="">Parameter</option>
                    <option value="">val2</option>
                  </select>
                </li>
                <li><input type="text" name="" id="" value="user01" /></li>                
              </ul>
              <div class={styles.btnBox}>
                <button className="btn-ic-trash"></button>
              </div>
            </div>
            <div class={styles.withBtn}>
              <ul class={styles.fieldListBox}>
                <li><input type="text" name="" id="" value="userPassword" /></li>                
                <li>
                  <select class="selectBox">
                    <option value="">Parameter</option>
                    <option value="">val2</option>
                  </select>
                </li>
                <li><input type="text" name="" id="" value="123456" /></li>                
              </ul>
              <div class={styles.btnBox}>
                <button className="btn-ic-trash"></button>
                <button className="btn-ic-add"></button>
              </div>
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label">Http 본문</div>
            <textarea placeholder="http 본문을 채워주세요. 채워지면 본문 유형의 http 매개변수는 무시됩니다."></textarea>
          </div>  
          <div className="input-group">
            <div className="input-label">Http 확인 조건</div>
            <select class="selectBox">
              <option value="">기본 응답 코드 200</option>
              <option value="">val2</option>
              <option value="">val3</option>
              <option value="">val4</option>
            </select>
          </div>  
          <div className="input-group">
            <div className="input-label">Http 조건</div>
            <textarea placeholder="http 조건을 입력하세요."></textarea>
          </div>  
          <div className="h-field">
            <div className="input-group flex-1">
              <div className="input-label">연결 시간 초과</div>
              <input type="number" name="" id="" value="60000" />
            </div>          
            <div className="input-group flex-1">
              <div className="input-label">소켓 타임아웃</div>
              <div class="toggleBox">
                <input type="number" name="" id="" value="60000" />
              </div>
            </div>        
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

export default TaskHTTPModal