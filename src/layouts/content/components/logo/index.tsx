import { defineComponent } from 'vue'
import { useThemeStore } from '@/store/theme/theme'
import styles from './index.module.scss'

const Logo = defineComponent({
  name: 'Logo',
  setup() {
    const themeStore = useThemeStore()

    return { themeStore }
  },
  render() {
    return (
      <div
        class={[
          styles.logo,
          styles[`logo-img`]
        ]}
      />
    )
  }
})

export default Logo
