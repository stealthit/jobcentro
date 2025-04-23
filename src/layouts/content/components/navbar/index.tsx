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

    console.log('menuKey', this.menuKey)

    return (
      <div class={styles.container}>        
        <ul class={styles.nav}>
          {menuItems.map(item => (
            <li
              key={item.key}
              class={[styles.menu, this.menuKey === item.key && styles.cur].filter(Boolean).join(' ')}
              onClick={() => this.handleMenuClick(item.key)}
            >
              <img alt="" className={item.iconClass} />
              {item.label}
            </li>
          ))}
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
