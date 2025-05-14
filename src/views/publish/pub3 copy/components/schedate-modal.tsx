import { defineComponent } from 'vue'
import styles from './index.module.scss'
import Pagination from '../../components/pagination'

const ScheDateModal = defineComponent({
  name: 'ScheDateModal',
  render() {
    return (
      <div class={[styles.schedateBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">스케줄 일자</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div class="pick-date-group">
            <div class="title-wrap">
              <div class="label-wrap">
                <div class="label">월</div>
                <button class="sel-all">전체선택</button>
              </div>
              <div class="toggle-wrap">
                <div class="label">사용여부</div>
                <div class="toggleBox">
                  {/* input 이 checked 일때 on 상태 */}
                  <input type="checkbox" id="toggle1" class="ck-toggle" hidden /> 

                  <label for="toggle1" class="toggleSwitch">
                    <span class="toggleButton"></span>
                  </label>
                </div>
              </div>
            </div>
            {/* 월:month, 요일:week, 일:day class 부여 */}
            <div class="sel-data-box month">
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" checked />
                <span>1</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>2</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>3</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>4</span>
              </label>                             
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>5</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>6</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>7</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>8</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>9</span>
              </label>                             
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>10</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>11</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>12</span>
              </label>  
            </div>
          </div>      
          <div class="pick-date-group">
            <div class="title-wrap">
              <div class="label-wrap">
                <div class="label">요일</div>
                <button class="sel-all">전체선택</button>
              </div>
              <div class="toggle-wrap">
                <div class="label">사용여부</div>
                <div class="toggleBox">
                  {/* input 이 checked 일때 on 상태 */}
                  <input type="checkbox" id="toggle2" class="ck-toggle" hidden /> 

                  <label for="toggle2" class="toggleSwitch">
                    <span class="toggleButton"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="sel-data-box week">
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" checked />
                <span>월</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>화</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>수</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>목</span>
              </label>                             
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>금</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>토</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>일</span>
              </label>                
            </div>
          </div>  
          <div class="pick-date-group">
            <div class="title-wrap">
              <div class="label-wrap">
                <div class="label">일</div>
                <button class="sel-all">전체선택</button>
              </div>
              <div class="toggle-wrap">
                <div class="label">사용여부</div>
                <div class="toggleBox">
                  {/* input 이 checked 일때 on 상태 */}
                  <input type="checkbox" id="toggle3" class="ck-toggle" hidden /> 

                  <label for="toggle3" class="toggleSwitch">
                    <span class="toggleButton"></span>
                  </label>
                </div>
              </div>
            </div>
            {/* 월:month, 요일:week, 일:day class 부여 */}
            <div class="sel-data-box day">
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" checked />
                <span>1</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>2</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>3</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>4</span>
              </label>                             
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>5</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>6</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>7</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>8</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>9</span>
              </label>                             
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>10</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>11</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>12</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>13</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>14</span>
              </label>                             
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>15</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>16</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>17</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>18</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>19</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>20</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" checked />
                <span>21</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>22</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>23</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>24</span>
              </label>                             
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>25</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>26</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>27</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>28</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>29</span>
              </label>                             
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>30</span>
              </label>  
              <label class='ckbtnStyle'>
                <input type="checkbox" name="" />
                <span>31</span>
              </label>  
            </div>
          </div>    
          <div class="pick-date-group">
            <div class="title-wrap">
              <div class="label-wrap">
                <div class="label">주/요일</div>
                <button class="sel-all">전체선택</button>
              </div>
              <div class="toggle-wrap">
                <div class="label">사용여부</div>
                <div class="toggleBox">
                  {/* input 이 checked 일때 on 상태 */}
                  <input type="checkbox" id="toggle4" class="ck-toggle" hidden /> 

                  <label for="toggle4" class="toggleSwitch">
                    <span class="toggleButton"></span>
                  </label>
                </div>
              </div>
            </div>
            {/* 월:month, 요일:week, 일:day class 부여 */}
            <div class="sel-data-box">
              <div class="tableWrap">
                <table class="job-table">                                     
                  <thead>               
                    <tr>
                      <th>주</th>
                      <th>월</th>
                      <th>화</th>
                      <th>수</th>
                      <th>목</th>
                      <th>금</th>
                      <th>토</th>
                      <th>일</th>
                    </tr>
                  </thead>
                  <tbody class="table-body">
                    <tr>
                      <td>1</td>                                              
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                    </tr>
                    <tr>
                      <td>2</td>                                              
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                    </tr>
                    <tr>
                      <td>3</td>                                              
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                    </tr>
                    <tr>
                      <td>4</td>                                              
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                    </tr>
                    <tr>
                      <td>5</td>                                              
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td><input type="checkbox" name="" id="" /></td>
                    </tr>
                                 
                  </tbody> 
                </table>                
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

export default ScheDateModal