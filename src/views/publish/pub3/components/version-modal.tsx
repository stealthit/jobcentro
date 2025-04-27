import { defineComponent } from 'vue'
import styles from './index.module.scss'
import Pagination from '../../components/pagination'

const VersionModal = defineComponent({
  name: 'VersionModal',
  render() {
    return (
      <div class={[styles.versionBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">Version Info</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div class="tableWrap">
            <table class="job-table">     
              <colgroup>
              <col width="60"/>
              <col width="175"/>
              <col width="175"/>
              <col width="175"/>
              <col width="175"/>
              </colgroup>                       
              <thead>               
                <tr>
                  <th>#</th>
                  <th>Version</th>
                  <th>Description</th>
                  <th>Create Time</th>
                  <th>Operation</th>                                   
                </tr>
              </thead>
              <tbody class="table-body">
                <tr>
                  <td>1</td>
                  <td>0 0 * * * ? *</td>    
                  <td>고객등급관리</td>                         
                  <td>2025-04-10 16:52:10</td>                         
                  <td>
                    <div class="btnGroup">
                      <button className="btn-ic-info"></button>
                      <button className="btn-ic-trash"></button>
                    </div>
                  </td>                         
                </tr>
                <tr>
                  <td>2</td>
                  <td>V1</td>    
                  <td>고객등급관리</td>                         
                  <td>2025-04-10 16:52:10</td >                         
                  <td>
                    <div class="btnGroup">
                      <button className="btn-ic-info"></button>
                      <button className="btn-ic-trash"></button>
                    </div>
                  </td>                         
                </tr>                  
              </tbody>
            </table>
            <Pagination></Pagination>
          </div>
        </div>
        <div class="modalBottom">
          <button className="modalBtnCancel">Cancel</button>
          <button className="modalBtnConfirm">Confirm</button>
        </div>
      </div>
    )
  }
})

export default VersionModal