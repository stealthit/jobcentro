import { defineComponent, onMounted, watch, toRefs, ref } from 'vue'
import { useMessage } from 'naive-ui'
import NavBar from './components/navbar'
import SideBar from './components/sidebar'
import Logo from './components/logo'
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
      // state.isShowSide = route.meta.showSide
      state.isShowSide = true
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
      <div class="layoutWrap"> 
        <div class="btn-sidebar">
          {/* <img src="" alt="" class={this.isShowSide ? "ic-menu gray" : "ic-menu"} /> */}
          <img src="" alt="" class="ic-menu gray" />
        </div>
        <div class={this.isShowSide ? "bgHeader sbOpen" : "bgHeader"}>
          <Logo />
        </div>                 
        <div class="mainWrap">
          {/* {this.isShowSide && ( */}
            <SideBar
            sideMenuOptions={this.sideMenuOptions}
            sideKey={this.sideKeyRef}
            isShowSide={this.isShowSide}
              />
          {/* )}  */}
          <div class="contentWrap">
            <div class="headerWrap">
              <NavBar
                // class='tab-horizontal'
                // headerMenuOptions={this.headerMenuOptions}
                // localesOptions={this.localesOptions}
                // timezoneOptions={this.timezoneOptions}
                // userDropdownOptions={this.userDropdownOptions}
              />
            </div>
            <div class="contentBox">
              <router-view key={this.currentRoute.fullPath} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Content
