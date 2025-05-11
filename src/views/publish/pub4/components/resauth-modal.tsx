import { defineComponent } from 'vue'
import styles from './index.module.scss'
import DropdownList from '../../components/dropdownlist'

const ResAuthModal = defineComponent({
  name: 'ResAuthModal',
  render() {
    const isData = true
    return (
      <div class={[styles.authBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">Resource Authorize</div>
          <button class="close"></button>
        </div>
        <div class="modalBody no-scroll">
          <ul class="tab-list">
            <li class="cur">File Resource</li>
            <li>UDF Resource</li>
          </ul>
          <DropdownList></DropdownList>
          
        </div>
        <div class="modalBottom">
          <button class="btnType1 modalBtnCancel">취소</button>
          <button class="btnType2 modalBtnConfirm">확인</button>
        </div>
      </div>
    )
  }
})

export default ResAuthModal