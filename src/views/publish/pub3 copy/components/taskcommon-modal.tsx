import { defineComponent } from 'vue'
import styles from './index.module.scss'

const TaskCommonModal = defineComponent({
  name: 'TaskCommonModal',
  render() {
    return (
      <div class={[styles.taskBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">현재 노드 설정</div>
          <button class="help"></button>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div class="input-group">
            <div class="input-label ic-tit-nece">노드 이름</div>
            <input type='text' placeholder="이름을 입력해주세요 (필수)" />
          </div> 
          <div className="h-field">
            <div className="input-group flex-1">
              <div className="input-label">실행여부</div>
              <div class="rdbtn-group">
                <label class='radioStyle'>
                  <input type="radio" name="radio1" checked />
                  <span>정상</span>
                </label> 
                <label class='radioStyle'>
                  <input type="radio" name="radio1" />
                  <span>금지 집행</span>
                </label>              
              </div>
            </div>          
            <div className="input-group flex-1">
              <div className="input-label">캐시 실행</div>
              <div class="toggleBox">
                {/* input 이 checked 일때 on 상태 */}
                <input type="checkbox" id="toggle1"  class="ck-toggle" hidden /> 

                <label for="toggle1" class="toggleSwitch">
                  <span class="toggleButton"></span>
                </label>
              </div>
            </div>        
          </div>          
          <div class="input-group">
            <div class="input-label">설명</div>
            <textarea placeholder="설명을 입력해주세요"></textarea>
          </div> 
          <div className="input-group">
            <div className="input-label ic-tit-nece">작업 우선순위</div>
            <select class="selectBox">
              <option value="">매우높음</option>
              <option value="">높음</option>
              <option value="">보통</option>
              <option value="">낮음</option>
              <option value="">매우낮음</option>
            </select>
          </div> 
          <div className="h-field">
            <div className="input-group flex-1">
              <div className="input-label">워커 그룹</div>
              <select class="selectBox">
                <option value="">기본</option>
                <option value="">val1</option>
                <option value="">val2</option>
                <option value="">val3</option>
                <option value="">val4</option>
              </select>
            </div> 
            <div className="input-group flex-1">
              <div className="input-label">이름</div>
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
            <div className="input-group flex-1">
              <div className="input-label">작업 그룹 이름</div>
              <select class="selectBox" required>
                <option value="" selected disabled hidden>선택해주세요</option>
                <option value="">val1</option>
                <option value="">val2</option>
                <option value="">val3</option>
                <option value="">val4</option>
              </select>
            </div> 
            <div className="input-group flex-1">
              <div className="input-label">우선 사항</div>
              <input type="number" name="" id="" placeholder="입력해주세요" />
            </div> 
          </div>
          <div className="h-field">
            <div className="input-group flex-1">
              <div className="input-label">실패 시 재시도 횟수 (타임스)</div>
              <input type="number" name="" id="" value="0" />
            </div> 
            <div className="input-group flex-1">
              <div className="input-label">재시도 간격 (분)</div>
              <input type="number" name="" id="" value="1" />
            </div> 
          </div>
          <div className="h-field">
            <div className="input-group flex-1">
              <div className="input-label">CPU 할당량 (%)</div>
              <input type="number" name="" id="" value="-1" />
            </div> 
            <div className="input-group flex-1">
              <div className="input-label">최대 메모리 (엠비)</div>
              <input type="number" name="" id="" value="-1" />
            </div> 
          </div>
          <div className="h-field">
            <div className="input-group flex-1">
              <div className="input-label">지연 실행 시간 (분)</div>
              <input type="number" name="" id="" value="0" />
            </div> 
            <div className="input-group flex-1">
              <div className="input-label">시간 초과 알람</div>
              <div class="toggleBox">
                {/* input 이 checked 일때 on 상태 */}
                <input type="checkbox" id="toggle2"  class="ck-toggle" hidden /> 

                <label for="toggle2" class="toggleSwitch">
                  <span class="toggleButton"></span>
                </label>
              </div>
            </div> 
          </div>
          <div className="input-group">
            <div className="input-label">타임아웃 전략</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio2" checked />
                <span>시간 초과 알람</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio2" />
                <span>시간 초과 시 실패  처리</span>
              </label>              
            </div>
          </div> 
          <div className="h-field">
            <div className="input-group flex-1">
              <div className="input-label">타임아웃 기간 (분)</div>
              <input type="number" name="" id="" value="30" />
            </div> 
            <div className="input-group flex-1">
              
            </div> 
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

export default TaskCommonModal