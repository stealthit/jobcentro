import { getCurrentInstance, onMounted, onBeforeUnmount, watch } from 'vue'
import { useThemeStore } from '@/store/theme/theme'
import { throttle } from 'echarts'
import type { Ref } from 'vue'
import type { ECharts } from 'echarts'
import type { ECBasicOption } from 'echarts/types/dist/shared'

function initChart<Opt extends ECBasicOption>(
  domRef: Ref<HTMLDivElement | null>,
  option: Opt,
  resizeFun?: any
): ECharts | null {
  let chart: ECharts | null = null
  const themeStore = useThemeStore()
  const globalProperties =
    getCurrentInstance()?.appContext.config.globalProperties

  option['backgroundColor'] = ''

  const init = () => {
    chart = globalProperties?.echarts.init(
      domRef.value,
      themeStore.darkTheme ? 'dark-bold' : 'macarons'
    )
    chart && chart.setOption(option)
  }

  const resize = throttle(() => {
    if (resizeFun) {
      resizeFun(chart)
      return
    }
    chart && chart.resize()
  }, 20)

  watch(
    () => themeStore.darkTheme,
    () => {
      chart?.dispose()
      init()
    }
  )

  watch(
    () => 'koKR',
    () => {
      chart?.dispose()
      init()
    }
  )

  watch(
    () => option,
    () => {
      chart?.dispose()
      init()
    },
    {
      deep: true
    }
  )

  onMounted(() => {
    init()
    addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    removeEventListener('resize', resize)
  })

  return chart
}

export default initChart
