import { defineComponent, PropType, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SettingOutlined } from '@vicons/antd'
import { NMenu, NButton, NIcon } from 'naive-ui'
import styles from './index.module.scss'
import Logo from '../logo'
import Locales from '../locales'
import Timezone from '../timezone'
import User from '../user'
import Theme from '../theme'

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

    const handleUISettingClick = () => {
      router.push({ path: '/ui-setting' })
    }

    watch(
      () => route.path,
      () => {
        menuKey.value = route.meta.activeMenu as string
      }
    )

    return { handleMenuClick, handleUISettingClick, menuKey }
  },
  render() {
    return (
      <div class={styles.container}>        
        <ul class={styles.nav}>
          <li><img alt="" class="ic-menu1" />Home</li>  
          <li class={styles.cur}><img alt="" class="ic-menu2" />배치 관리</li>  
          <li><img alt="" class="ic-menu3" />작업 리소스</li>  
          <li><img alt="" class="ic-menu4" />예측</li>  
          <li><img alt="" class="ic-menu5" />리포팅</li>  
          <li><img alt="" class="ic-menu6" />모니터링</li>  
          <li><img alt="" class="ic-menu7" />시스템 관리</li>  
        </ul>
        <div class={styles.settings}>
          <img src="" alt="" class="ic-profile" />
          <img src="" alt="" class="ic-arr-down-12" />
        </div>
      </div>
    )
  }
})

export default Navbar
