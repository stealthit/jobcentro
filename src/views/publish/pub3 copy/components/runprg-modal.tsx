import { defineComponent } from 'vue'
import styles from './index.module.scss'
import Pagination from '../../components/pagination'

const RunPrgModal = defineComponent({
  name: 'RunPrgModal',
  render() {
    return (
      <div class={[styles.runPrgBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">로그 파일명__작업일 설정 - RunProgram</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group">
            <div className="input-label">워크플로우</div>
            <input type='text' value="청구데이터 수집" />
          </div>
          <div className="input-group">
            <div className="input-label">실패 시 전략</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio" checked />
                <span>재시도</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio" />
                <span>종료</span>
              </label>              
            </div>
          </div>
          <div className="input-group">
            <div className="input-label">워크플로우 우선순위</div>
            <select class="selectBox">
              <option value="">medium</option>
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
            </select>
          </div> 
          <div className="input-group">
            <div className="input-label">Worker 그룹</div>
            <select class="selectBox">
              <option value="">기본</option>
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
            </select>
          </div> 
          <div className="input-group">
            <div className="input-label">Tenant</div>
            <select class="selectBox">
              <option value="">tenant1</option>
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
            </select>
          </div> 
          <div className="input-group">
            <div className="input-label">Environment명</div>
            <select class="selectBox">
              <option value="">선택해주세요</option>
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
            </select>
          </div> 
          <div className="input-group">
            <div className="input-label">파라미터</div>
            <div class="tableWrap">
              <table class="job-table">     
                <colgroup>
                  <col width="80"/>
                  <col width="480"/>
                </colgroup>                       
                <thead>               
                  <tr>
                    <th>#</th>
                    <th>값</th>
                  </tr>
                </thead>
                <tbody class="table-body">
                  <tr>
                    <td>1</td>
                    <td></td>                                              
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>                            
                  </tr>                  
                  <tr>
                    <td>3</td>
                    <td></td>                            
                  </tr>                  
                  <tr>
                    <td>4</td>
                    <td></td>                            
                  </tr>                  
                  <tr>
                    <td>5</td>
                    <td></td>                            
                  </tr>                  
                </tbody> 
              </table>
              <div class={[styles.btnBox,"btnGroup"]}>
                <button class="btnType1 btn-add">추가</button>
                <button class="btnType1 btn-remove">제거</button>
                <button class="btnType1 btn-up">위로</button>
                <button class="btnType1 btn-down">아래로</button>
              </div>
            </div>
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

export default RunPrgModal