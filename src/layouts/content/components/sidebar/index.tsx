import { defineComponent, ref, PropType } from 'vue'
import { useMenuClick } from './use-menuClick'
import styles from './index.module.scss'
import Logo from '../logo'
import SideMenu from '../sidemenu'

const Sidebar = defineComponent({
  name: 'Sidebar',
  props: {
    sideMenuOptions: {
      type: Array as PropType<any>,
      default: []
    },
    sideKey: {
      type: String as PropType<string>,
      default: ''
    },
    isShowSide: Boolean
  },
  setup() {
    const collapsedRef = ref(false)
    const defaultExpandedKeys = [
      'workflow',
      'task',
      'udf-manage',
      'service-manage',
      'statistical-manage',
      'task-group-manage'
    ]

    const { handleMenuClick } = useMenuClick()

    
    return { collapsedRef, defaultExpandedKeys, handleMenuClick }
  },
  render() {
    return (
      // <div class={[styles.container, styles.open]}>
      <div class={this.isShowSide ? [ styles.container, styles.open] : styles.container}>
        <div class={styles.top}>
          <Logo isShowSide />
        </div>

        <SideMenu
          options={this.sideMenuOptions}
        />
        
      </div>
    )
  }
})

export default Sidebar
