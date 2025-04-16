import { defineComponent, computed, ref, nextTick, provide } from 'vue'
import {
  koKR,
  dateKoKR,
  NConfigProvider,
  darkTheme,
  NMessageProvider
} from 'naive-ui'
import { useThemeStore } from '@/store/theme/theme'
import themeList from '@/themes'

const App = defineComponent({
  name: 'App',
  setup() {
    const isRouterAlive = ref(true)
    const themeStore = useThemeStore()
    const currentTheme = computed(() =>
      themeStore.darkTheme ? darkTheme : undefined
    )
    
    const reload = () => {
      isRouterAlive.value = false
      nextTick(() => {
        isRouterAlive.value = true
      })
    }

    provide('reload', reload)

    return {
      reload,
      isRouterAlive,
      currentTheme
    }
  },
  render() {
    const themeOverrides =
      themeList[this.currentTheme ? 'dark' : 'light']

    return (
      <NConfigProvider
        theme={this.currentTheme}
        theme-overrides={themeOverrides}
        style={{ width: '100%', height: '100vh' }}
        date-locale={ dateKoKR }
        locale={ koKR }
      >
        <NMessageProvider>
          {this.isRouterAlive ? <router-view /> : ''}
        </NMessageProvider>
      </NConfigProvider>
    )
  }
})

export default App
