import { defineComponent, PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import styles from './index.module.scss'

const SideMenu = defineComponent({
  name: 'SideMenu',
  props: {
    options: {
      type: Array as PropType<any>,
      default: []
    },
    isShowSide: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const handleMenuClick = (key: string) => {
      router.push({ path: `${key}` })
    }

    // 재귀적으로 메뉴를 렌더링하는 함수
    const renderMenuItems = (items: any[]) => {
      return items.map(item => {
        const isActive = item.key.includes(route.meta.activeSideMenu) 
        return (
          <li
            key={item.key}
            class={[isActive ? 'cur' : undefined]}
            onClick={() => {
              if (!item.children) handleMenuClick(item.key)
            }}
          >
            {Array.isArray(item.children) && item.children.length > 0 ? (
              <details>
                <summary>
                  <div class="depth2Wrap">
                    {item.label}
                    <img class="ic-setting-18" />
                  </div>
                </summary>
                <ul>{renderMenuItems(item.children)}</ul>
              </details>
            ) : (
              <div class="title">{item.label}</div>
            )}
          </li>
        )
      })
    }

    return { renderMenuItems, route }
  },
  render() {
    return (
      <div class={styles.menuWrap}>
        <ul class={this.isShowSide ? 'sbMenuWrap sbOpen' : 'sbMenuWrap'}>
          {this.route.name === 'home' ? undefined : this.renderMenuItems(this.options)}
        </ul>
      </div>
    )
  }
})

export default SideMenu
