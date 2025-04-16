import { defineComponent, onMounted, watch, toRefs, ref } from 'vue'
import { NLayout, NLayoutContent, NLayoutHeader, useMessage } from 'naive-ui'
import NavBar from './components/navbar'
import SideBar from './components/sidebar'
import { useDataList } from './use-dataList'
import { useRouteStore } from '@/store/route/route'
import { useRoute } from 'vue-router'

const Content = defineComponent({
  name: 'DSContent',
  setup() {
    window.$message = useMessage()

    const route = useRoute()
    const routeStore = useRouteStore()
    const {
      state,
      changeMenuOption,
      changeHeaderMenuOptions,
      changeUserDropdown
    } = useDataList()
    const sideKeyRef = ref()

    onMounted(() => {
      changeMenuOption(state)
      changeHeaderMenuOptions(state)
      getSideMenu(state)
      changeUserDropdown(state)
    })

    const getSideMenu = (state: any) => {
      const key = route.meta.activeMenu
      state.sideMenuOptions =
        state.menuOptions.filter((menu: { key: string }) => menu.key === key)[0]
          ?.children || state.menuOptions
      state.isShowSide = route.meta.showSide
    }

    watch(
      () => route.path,
      () => {
        if (route.path !== '/login') {
          routeStore.setLastRoute(route.path)

          state.isShowSide = route.meta.showSide as boolean
          if (route.matched[1].path === '/projects/:projectCode') {
            changeMenuOption(state)
          }

          getSideMenu(state)
          const currentSide = (
            route.meta.activeSide
              ? route.meta.activeSide
              : route.matched[1].path
          ) as string
          sideKeyRef.value = currentSide.includes(':projectCode')
            ? currentSide.replace(
                ':projectCode',
                route.params.projectCode as string
              )
            : currentSide
        }
      },
      { immediate: true }
    )

    return {
      ...toRefs(state),
      changeMenuOption,
      sideKeyRef,
      currentRoute: route
    }
  },
  render() {
    return (
      <NLayout style='height: 100%'>
        <NLayoutHeader style='height: 65px'>
          <NavBar
            class='tab-horizontal'
            headerMenuOptions={this.headerMenuOptions}
            localesOptions={this.localesOptions}
            timezoneOptions={this.timezoneOptions}
            userDropdownOptions={this.userDropdownOptions}
          />
        </NLayoutHeader>
        <NLayout has-sider position='absolute' style='top: 65px'>
          {this.isShowSide && (
            <SideBar
              sideMenuOptions={this.sideMenuOptions}
              sideKey={this.sideKeyRef}
            />
          )}
          <NLayoutContent
            native-scrollbar={false}
            style='padding: 16px 22px'
            contentStyle={'height: 100%'}
          >
            <router-view key={this.currentRoute.fullPath} />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    )
  }
})

export default Content
