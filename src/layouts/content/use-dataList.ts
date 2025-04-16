import { reactive, h } from 'vue'
import { NEllipsis, NIcon } from 'naive-ui'
import {
  HomeOutlined,
  FolderOutlined,
  UserOutlined,
  LogoutOutlined,
  FileSearchOutlined,
  RobotOutlined,
  KeyOutlined,
  GroupOutlined
} from '@vicons/antd'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user/user'
import { timezoneList } from '@/common/timezone'

export function useDataList() {
  const route = useRoute()
  const userStore = useUserStore()

  const renderIcon = (icon: any) => {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  const timezoneOptions = () =>
    timezoneList.map((item) => ({ label: item, value: item }))

  const state = reactive({
    isShowSide: false,
    timezoneOptions: timezoneOptions(),
    userDropdownOptions: [],
    menuOptions: [],
    headerMenuOptions: [],
    sideMenuOptions: []
  })

  const changeMenuOption = (state: any) => {
    const projectCode = route.params.projectCode || ''
    const projectName = route.query.projectName || ''
    state.menuOptions = [
      {
        label: () => h(NEllipsis, null, '홈'),
        key: 'home',
        icon: renderIcon(HomeOutlined)
      },
      {
        label: () => h(NEllipsis, null, '작업 리소스'),
        key: 'resource',
        icon: renderIcon(FolderOutlined),
        children: [
          {
            label: '파일 관리',
            key: '/resource/file-manage',
            icon: renderIcon(FileSearchOutlined)
          },
          {
            label: '사용자 정의 함수 관리',
            key: 'udf-manage',
            icon: renderIcon(RobotOutlined),
            children: [
              {
                label: '리소스 관리',
                key: '/resource/resource-manage'
              },
              {
                label: '함수관리',
                key: '/resource/function-manage'
              }
            ]
          },
          {
            label: '작업 그룹 관리',
            key: 'task-group-manage',
            icon: renderIcon(GroupOutlined),
            children: [
              {
                label: '작업 그룹 설정',
                key: '/resource/task-group-option'
              },
              {
                label: '작업 그룹 대기열',
                key: '/resource/task-group-queue'
              }
            ]
          }
        ]
      }
    ]
  }

  const changeHeaderMenuOptions = (state: any) => {
    state.headerMenuOptions = state.menuOptions.map(
      (item: { label: string; key: string; icon: any }) => {
        return {
          label: item.label,
          key: item.key,
          icon: item.icon
        }
      }
    )
  }

  const changeUserDropdown = (state: any) => {
    state.userDropdownOptions = [
      {
        label: 'Profile',
        key: 'profile',
        icon: renderIcon(UserOutlined)
      },
      {
        label: 'Password',
        key: 'password',
        icon: renderIcon(KeyOutlined),
        disabled: userStore.getSecurityConfigType !== 'PASSWORD'
      },
      {
        label: 'Logout',
        key: 'logout',
        icon: renderIcon(LogoutOutlined)
      }
    ]
  }

  return {
    state,
    changeHeaderMenuOptions,
    changeMenuOption,
    changeUserDropdown
  }
}
