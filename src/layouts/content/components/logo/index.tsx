import { defineComponent } from 'vue'
import { useThemeStore } from '@/store/theme/theme'
import styles from './index.module.scss'

const Logo = defineComponent({
  name: 'Logo',
  props: {
    isShowSide: Boolean
  },
  setup() {
    const themeStore = useThemeStore()

    return { themeStore }
  },
  render() {
    return (
      // 2025.04.21 pub_sunhee
     <div class={this.isShowSide ? [styles.logo, styles.on] : styles.logo} />
    )
  }
})

export default Logo
