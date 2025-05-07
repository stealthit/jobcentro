import { defineComponent, PropType, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import styles from './index.module.scss'

const Navbar = defineComponent({
  name: 'Navbar',
  props: {
    headerMenuOptions: {
      type: Array as PropType<any>,
      default: []
    },
    localesOptions: {
      type: Array as PropType<any>,
      default: []
    },
    timezoneOptions: {
      type: Array as PropType<any>,
      default: []
    },
    userDropdownOptions: {
      type: Array as PropType<any>,
      default: []
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const menuKey = ref(route.meta.activeMenu as string)

    const handleMenuClick = (key: string) => {
      router.push({ path: `/${key}` })
    }

    watch(
      () => route.path,
      () => {
        menuKey.value = route.meta.activeMenu as string
      }
    )

    return { handleMenuClick, menuKey }
  },
  render() {
    const menuItems = [
      { key: 'home', label: 'Home', iconClass: 'ic-menu1' },
      { key: 'projects', label: '배치 관리', iconClass: 'ic-menu2' },
      { key: 'resource', label: '작업 리소스', iconClass: 'ic-menu3' },
      { key: 'prediction', label: '예측', iconClass: 'ic-menu4' },
      { key: 'report', label: '리포트', iconClass: 'ic-menu5' },
      { key: 'monitor', label: '모니터링', iconClass: 'ic-menu6' },
      { key: 'security', label: '시스템 관리', iconClass: 'ic-menu7' },
    ];

    const isSetmenu1 = false
    const isSetmenu2 = false
    const isSetmenu3 = false

    return (
      <div class={styles.container}>        
        <ul class={styles.nav}>
          {menuItems.map(item => (
            <li
              key={item.key}
              class={[styles.menu, this.menuKey === item.key && styles.cur].filter(Boolean).join(' ')}
              onClick={() => this.handleMenuClick(item.key)}
            >
              <img alt="" class={item.iconClass} />
              {item.label}
            </li>
          ))}
        </ul>
        <ul class={styles.settings}>
          <li class={isSetmenu1 ? styles.sel : ""}>
            UI 설정
            <img src="" alt="" class={isSetmenu1 ? "ic-nav-up-12" : "ic-nav-down-12"} />
            {/* UI 설정 창 */}
            {isSetmenu1 &&
              <div class={[styles.settingUIBox,"conBox"]}>
                <div class={styles.title}>Request Settings</div>
                <div class={styles.selGrp}>
                  <div class={styles.label}>API Timeout</div>
                  <select class="selectBox">
                    <option value="">10000 Millisecond</option>
                    <option value="">val3</option>
                    <option value="">val4</option>
                    <option value="">val5</option>
                  </select>
                </div>
                <div class={styles.selGrp}>
                  <div class={styles.label}>Log Auto Refresh Time</div>
                  <select class="selectBox">
                    <option value="">Off</option>
                    <option value="">On</option>
                  </select>
                </div>
                <div class="h-divider"></div>
                <div class={styles.title}>Experimental Feature</div>
                <div class={styles.selGrp}>
                  <div class={styles.label}>Dynamic Task Component</div>
                  
                  <div class="toggleBox">
                    {/* input 이 checked 일때 on 상태 */}
                    <input type="checkbox" id="toggle"  class="ck-toggle" hidden /> 

                    <label for="toggle" class="toggleSwitch">
                      <span class="toggleButton"></span>
                    </label>
                  </div>
                </div>
              </div>
            }
          </li>
          <li class={isSetmenu2 ? styles.sel : ""}>
            Asia/Seoul
            <img src="" alt="" class={isSetmenu2 ? "ic-nav-up-12" : "ic-nav-down-12"} />
            {/* timeZone 설정창 */}
            {isSetmenu2 &&
              <div class={[styles.settingZoneBox,"conBox"]}>
                <div class={styles.selGrp}>
                  <div class={styles.label}>
                    Asia/Seoul
                    <span>Local</span>
                  </div>
                  <select class="selectBox" disabled>
                    <option value="">Choose time Zone</option>
                    <option value="">Asia/Seoul</option>
                  </select>
                </div>
              </div>
            }
          </li>
          <li class={isSetmenu3 ? styles.sel : ""}>
            <img src="" alt="" class="ic-profile" />
            <img src="" alt="" class={isSetmenu3 ? "ic-nav-up-12" : "ic-nav-down-12"} />
            {/* 사용자 설정창 */}
            {isSetmenu3 &&
              <div class={[styles.settingProfBox,"conBox"]}>
                <ul>
                  <li><img class="ic-user-16" />Profile</li>
                  <li><img class="ic-pwd-16" />Password</li>
                  <li><img class="ic-logout-16" />Logout</li>
                </ul>
              </div>
            }
          </li>
        </ul>
      </div>
    )
  }
})

export default Navbar
