import { defineComponent } from 'vue'
import styles from './index.module.scss'

const TaskSubProcessModal = defineComponent({
  name: 'TaskSubProcessModal',
  render() {
    return (
      <div class={[styles.taskBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">워크플로우 Task - Java</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">                           
          <div className="input-group">
            <div className="input-label">자식노드</div>
            <select class="selectBox" required>
              <option value="" selected disabled hidden>선택해주세요</option>
              <option value="">testworkflow</option>
              <option value="">val2</option>
              <option value="">val3</option>
              <option value="">val4</option>
            </select>
          </div> 
          <div className="input-group">
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

export default TaskSubProcessModal