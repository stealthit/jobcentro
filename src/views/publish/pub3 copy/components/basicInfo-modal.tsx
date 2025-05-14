import { defineComponent } from 'vue'
import styles from './index.module.scss'
import Pagination from '../../components/pagination'

const BasicInfoModal = defineComponent({
  name: 'BasicInfoModal',
  render() {
    return (
      <div class={[styles.basicInfoBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">Basic Information</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group">
            <div className="input-label ic-tit-nece">Workflow Name</div>
            <input type='text' value="고객등급관리" />
          </div> 
          <div className="input-group">
            <div className="input-label">Description</div>
            <textarea value="고객등급관리"></textarea>
          </div>           
          <div className="input-group">
            <div className="input-label">Timeout Alert</div>
            <div class="toggleBox">
              {/* input 이 checked 일때 on 상태 */}
              <input type="checkbox" id="toggle"  class="ck-toggle" hidden /> 

              <label for="toggle" class="toggleSwitch">
                <span class="toggleButton"></span>
              </label>
            </div>
          </div> 
          <div className="input-group">
            <div className="input-label">Process execute type</div>
            <input type='text' value="parallel" />
          </div> 
          <div className="input-group">
            <div className="input-label">Global Parameters</div>
            <button className="btnType1 btn-add">추가</button>
          </div> 
          <div className="ckbox-group">
            <input type="checkbox"  />
            <span>Whether to go online the workflow definition</span>
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

export default BasicInfoModal