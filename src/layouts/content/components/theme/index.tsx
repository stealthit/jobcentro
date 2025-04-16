import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'
import { useThemeStore } from '@/store/theme/theme'
import styles from './index.module.scss'

const Theme = defineComponent({
  name: 'Theme',
  setup() {
    const themeStore = useThemeStore()

    return { themeStore }
  },
  render() {
    return (
      <NButton
        class={styles.theme}
        quaternary
        onClick={() => (this.themeStore.darkTheme = !this.themeStore.darkTheme)}
      >
        {this.themeStore.darkTheme ? '어두운' : '밝은'}
      </NButton>
    )
  }
})

export default Theme
