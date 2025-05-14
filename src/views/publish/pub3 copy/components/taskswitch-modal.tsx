import { defineComponent } from 'vue'
import styles from './index.module.scss'

const TaskSwitchModal = defineComponent({
  name: 'TaskSwitchModal',
  render() {
    return (
      <div class={[styles.taskBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">워크플로우 Task - Switch</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group">
            <div className="input-label">Switch 조건</div>
            <input type="text" name="" id="" value="${switchValue}==A"/>
          </div>                                         
          <div class="input-group">
            <div class="input-label">브랜치 분기</div>
            <div class={styles.withBtn}>
              <select class="selectBox">
                <option value="">Shell A</option>
                <option value="">val1</option>
                <option value="">val2</option>
                <option value="">val3</option>
                <option value="">val4</option>
              </select>
              <div class={styles.btnBox}>
                <button class="btn-ic-trash"></button>
              </div>
            </div>
            <input type="text" name="" id="" value="${switchValue}==A"/>
          </div> 
          <div class="input-group">
            <div class="input-label">브랜치 분기</div>
            <div class={styles.withBtn}>
              <select class="selectBox">
                <option value="">Shell B</option>
                <option value="">val1</option>
                <option value="">val2</option>
                <option value="">val3</option>
                <option value="">val4</option>
              </select>
              <div class={styles.btnBox}>
                <button class="btn-ic-trash"></button>
                <button class="btn-ic-add"></button>
              </div>
            </div>
            <input type="text" name="" id="" value="${switchValue}==B"/>
          </div> 
          <div className="input-group">
            <div className="input-label">Default 브랜치 분기</div>
            <select class="selectBox">
              <option value="">Shell Default</option>
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

export default TaskSwitchModal