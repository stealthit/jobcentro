import { defineComponent } from 'vue'

const DropdownList = defineComponent({
  name: 'DropdownList',
  render() {
    const isData = false
    const isOpen = true
    const isBtnStyle = false
    return (
      <div class={isOpen ? "dropdownList open" : "dropdownList"}>
        {isBtnStyle ? 
          <div class="data">
            <ul class="btnstyle">
              <li><div class="name">data1</div><button class="btn-clear"></button></li>
              <li><div class="name">data2</div><button class="btn-clear"></button></li>
              <li><div class="name">data3</div><button class="btn-clear"></button></li>
            </ul>
          </div>
        :
          <div class="data">선택해 주세요</div>
        }
        {isOpen &&
          <div class="item-box">
            {isData ? 
              <ul class="data-list">
                <li>data1</li>
                <li>data2</li>
                <li>data3</li>
              </ul>
              :
              <div class="no-data">
                <img src="" alt="" className="ic-nodata-36" />
                데이타없음
              </div>
            }
          </div>
        }
      </div>
    )
  }
})

export default DropdownList