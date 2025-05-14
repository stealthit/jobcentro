import { defineComponent } from 'vue'
import styles from './index.module.scss'

const TaskSQLModal = defineComponent({
  name: 'TaskSQLModal',
  render() {
    return (
      <div class={[styles.taskBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">워크플로우 Task - SQL</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="h-field">
            <div className="input-group flex-1">
              <div className="input-label ic-tit-nece">데이터 소스 유형</div>
              <select class="selectBox">
                <option value="">마이SQL</option>
                <option value="">postgres</option>
                <option value="">spark </option>
              </select>
            </div> 
            <div className="input-group flex-1">
              <div className="input-label ic-tit-nece">데이터 소스 인스턴스</div>
              <select class="selectBox" required>
                <option value="" selected disabled hidden>선택해주세요</option>
                <option value="">val1</option>
                <option value="">val2</option>
                <option value="">val3</option>
                <option value="">val4</option>
              </select>
            </div> 
          </div>
          <div className="h-field">
            <div className="h-field flex-1">
              <div className="input-group flex-1">
                <div className="input-label ic-tit-nece">SQL 유형</div>
                <select class="selectBox">
                  <option value="">Query</option>
                  <option value="">Non-Query</option>
                </select>
              </div> 
              <div className="input-group flex-1">
                <div className="input-label">이메일 보내기</div>
                <div class="toggleBox">
                  {/* input 이 checked 일때 on 상태 */}
                  <input type="checkbox" id="toggle1"  class="ck-toggle" hidden /> 

                  <label for="toggle1" class="toggleSwitch">
                    <span class="toggleButton"></span>
                  </label>
                </div>
              </div>  
            </div>
            <div className="h-field flex-1 gap-8">
              <div className="input-group flex-1">
                <div className="input-label ic-tit-nece">로그 표시</div>
                <select class="selectBox">
                  <option value="">10</option>
                  <option value=""></option>
                </select>
              </div> 
              <div className="input-group flex-1">
                <div className="input-label"> </div>
                <span class="text">결과의 행</span>
              </div> 
            </div>
          </div>
          <div class="input-group">
            <div class="input-label ic-tit-nece">제목</div>
            <input type='text' placeholder="이메일 제목을 입력해주세요" />
          </div> 
          <div class="input-group">
            <div class="input-label ic-tit-nece">알람 그룹</div>
            <input type='text' placeholder="알람 그룹이 필요합니다" />
          </div> 
          <div class="input-group">
            <div class="input-label ic-tit-nece">SQL 문</div>
            {/* sql 문 영역 */}
            <div class={styles.sqlBox}>
              
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
          <div class="input-group">
            <div class="input-label">선행 SQL</div>
            <div class={styles.withBtn}>
              <input type="text" name="" id="" value="DELETE FRAOM in_biz;" />
              <div class={styles.btnBox}>
                <button class="btn-ic-trash"></button>
                <button class="btn-ic-add"></button>
              </div>
            </div>
          </div> 
          <div class="input-group">
            <div class="input-label">후행 SQL</div>
            <div class={styles.withBtn}>
              <input type="text" name="" id="" value="DELETE FRAOM in_biz;" />
              <div class={styles.btnBox}>
                <button class="btn-ic-trash"></button>
              </div>
            </div>
            <div class={styles.withBtn}>
              <input type="text" name="" id="" value="DELETE FRAOM in_biz;" />
              <div class={styles.btnBox}>
                <button class="btn-ic-trash"></button>
                <button class="btn-ic-add"></button>
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

export default TaskSQLModal