import { defineComponent } from 'vue'
import styles from './index.module.scss'

const AuthModal = defineComponent({
  name: 'AuthModal',
  render() {
    const isData1 = true
    const isData2 = true
    return (
      <div class={[styles.authBox,"modalWrap conBox"]}>
        <div class="modalTop">
          <div class="title">UDF Function Authorize</div>
          <button class="close"></button>
        </div>
        <div class={[styles.modalBody,"modalBody"]}>    
          <div class={styles.itemBox}>
            <div class={styles.listBox}>
              <div class={styles.listTitle}>
                <div class={styles.underText}>Select all</div>
                <div className={styles.itemCnt}>
                  Total <span>2</span> items
                </div>
              </div>
              <div class="input-search">
                <input type="search" name="" id="" placeholder="입력해 주세요" />
                <img src="" alt="" className="ic-search" />
              </div>
              <div class={styles.itemList}>
                {isData1 ? 
                  <ul class={styles.dataList}>
                    <li><input type="checkbox" name="" id="" />localhost-postgresql</li>
                    <li><input type="checkbox" name="" id="" />localhost-mysql</li>                    
                  </ul>
                  :
                  <div class={styles.noData}>
                    <img src="" alt="" className="ic-nodata-36" />
                    데이타 없음
                  </div>
                }
              </div>
            </div>
            <div class="v-divider"></div>
            <div class={styles.listBox}>
              <div class={styles.listTitle}>
              {isData2 &&
                <div class={styles.underText}>Clear</div>
              }
                <div className={styles.itemCnt}>
                  <span>1</span> items selected
                </div>
              </div>
              <div class={styles.itemList}>
                {isData2 ? 
                  <ul class={styles.dataList}>
                    <li>localhost-postgresql</li>
                  </ul>
                  :
                  <div class={styles.noData}>
                    <img src="" alt="" className="ic-nodata-36" />
                    데이타 없음
                  </div>
                }
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

export default AuthModal