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
        <Logo />
        <div class={styles.nav}>
          <NMenu
            value={this.menuKey}
            mode='horizontal'
            options={this.headerMenuOptions}
            onUpdateValue={this.handleMenuClick}
          />
        </div>
        <div class={styles.settings}>
          <NButton quaternary onClick={this.handleUISettingClick}>
            {{
              icon: () => (
                <NIcon size='16'>
                  <SettingOutlined />
                </NIcon>
              ),
              default: 'UI 설정'
            }}
          </NButton>
          <Theme />
          <Locales localesOptions={this.localesOptions} />
          <Timezone timezoneOptions={this.timezoneOptions} />
          <User userDropdownOptions={this.userDropdownOptions} />
        </div>
      </div>
    )
  }
})

export default Navbar
