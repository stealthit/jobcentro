import { defineComponent } from 'vue'
import styles from './index.module.scss'
import Pagination from '../../components/pagination'

const PrjAuthModal = defineComponent({
  name: 'PrjAuthModal',
  render() {
    return (
      <div class={[styles.prjAuthBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">Project Authorize</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">    
          <div class={styles.topGroup}>
            <div class={styles.btnBox}>
              <button className="btnType1 btn-close2">Revoke</button>
              <button className="btnType1 btn-read">Grant Read</button>
              <button className="btnType1 btn-grant">Grant All</button>
            </div>
            <div class="searchBox">
              <input type="text" name="" id="" placeholder="Please enter your project" />
              <button class="btn-ic-search"></button>
            </div>
          </div>      
          <div class="tableWrap">
            <table class="job-table">     
              <colgroup>
                <col width="60"/>
                <col width="350"/>
                <col width="350"/>
              </colgroup>                       
              <thead>               
                <tr>
                  <th><input type="checkbox" name="" id="" /></th>
                  <th>Project Name</th>
                  <th>Authorize Level</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>고객 등급 관리 프로젝트</td>    
                  <td>All Permission</td>                                          
                </tr>                              
              </tbody> 
            </table>
            <Pagination></Pagination>
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

export default PrjAuthModal