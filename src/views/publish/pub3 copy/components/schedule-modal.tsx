import { defineComponent } from 'vue'
import styles from './index.module.scss'
import Pagination from '../../components/pagination'

const ScheduleModal = defineComponent({
  name: 'ScheduleModal',
  render() {
    return (
      <div class={[styles.runPrgBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">[워크플로우] 스케줄</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group">
            <div className="input-label">워크플로우</div>
            <input type='text' value="청구데이터 수집" />
          </div> 
          <div className="input-group">
            <div className="input-label">시작/종료일</div>
            <div className="mul-calendar-group">
              <div className="data-box">
                <input type="datetime-local" name="" id="" value="2025-03-24 00:00:00" />
                <span>~</span>
                <input type="datetime-local" name="" id="" value="2025-03-24 00:00:00"/>
              </div>
            </div>
          </div>           
          <div className="input-group">
            <div className="input-label">스케줄 일자</div>
            <input type='text' value="3월, 매주 수요일," />
          </div>           
          <div className="input-group">
            <div className="input-label">스케줄 시간</div>
            <div class="tableWrap">
              <table class="job-table">     
                <colgroup>
                  <col width="60"/>
                  <col width="500"/>
                </colgroup>                       
                <thead>               
                  <tr>
                    <th>선택</th>
                    <th>시간</th>
                  </tr>
                </thead>
                <tbody class="table-body">
                  <tr>
                    <td><input type="checkbox" name="" id="" /> </td>
                    <td></td>                                              
                  </tr>
                  <tr>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td></td>                            
                  </tr>                  
                  <tr>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td></td>                            
                  </tr>                  
                  <tr>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td></td>                            
                  </tr>                  
                  <tr>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td></td>                            
                  </tr>                  
                </tbody> 
              </table>
              <div class={[styles.btnBox,"btnGroup"]}>
                <button class="btnType1 btn-add">추가</button>
                <button class="btnType1 btn-remove">제거</button>
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

export default ScheduleModal