import { defineComponent } from 'vue'
import styles from './index.module.scss'

const CreateUserModal = defineComponent({
  name: 'CreateUserModal',
  render() {
    return (
      <div class={[styles.userBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">Create User</div>
          <button class="close"></button>
        </div>
        <div class="modalBody">
          <div className="input-group">
            <div className="input-label ic-tit-nece">Username</div>
            <input type='text' value="admin" />
          </div>
          {/* Edit 일때 password 필드는 제외 */}
          <div className="input-group">
            <div className="input-label ic-tit-nece">Password</div>
            <input type='password' value="1234567" />
          </div>     
               
          <div className="input-group">
            <div className="input-label ic-tit-nece">Tenant</div>
            <select class="selectBox">
              <option value="">default</option>
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
            </select>
          </div> 
          <div className="input-group">
            <div className="input-label">Queue</div>
            <select class="selectBox">
              <option value="">default</option>
              <option value="">val1</option>
              <option value="">val2</option>
              <option value="">val3</option>
            </select>
          </div>        
          <div className="input-group">
            <div className="input-label ic-tit-nece">Email</div>
            <input type='text' placeholder="Please enter email" />
          </div>   
          <div className="input-group">
            <div className="input-label">Phone</div>
            <input type='text' placeholder="Please enter phone number" />
          </div>
          <div className="input-group">
            <div className="input-label">State</div>
            <div class="rdbtn-group">
              <label class='radioStyle'>
                <input type="radio" name="radio" checked />
                <span>Enable</span>
              </label> 
              <label class='radioStyle'>
                <input type="radio" name="radio" />
                <span>Disable</span>
              </label>              
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

export default CreateUserModal