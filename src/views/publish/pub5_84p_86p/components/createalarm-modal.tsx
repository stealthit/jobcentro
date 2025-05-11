import { defineComponent } from 'vue'
import styles from './index.module.scss'
import DropdownList from '../../components/dropdownlist'

const CreateAlarmModal = defineComponent({
  name: 'CreateAlarmModal',
  render() {
    return (
      <div class={[styles.alarmBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">Create Alarm Group</div>
          <button class="close"></button>
        </div>
        <div class="modalBody no-scroll">
          <div className="input-group">
            <div className="input-label ic-tit-nece">Alert Group Name</div>
            <input type='text' placeholder="Please enter your alert group name" />
          </div>
          <div className="input-group">
            <div className="input-label ic-tit-nece">Alarm Plugin Instance</div>
            <DropdownList></DropdownList>
          </div>
          
          <div className="input-group">
            <div className="input-label">워크플로우 우선순위</div>
            <textarea name="" id=""></textarea>
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

export default CreateAlarmModal