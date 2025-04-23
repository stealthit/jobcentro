import { reactive, h } from 'vue'
import { NEllipsis, NIcon } from 'naive-ui'
import {
  HomeOutlined,
  ProfileOutlined,
  FolderOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  LogoutOutlined,
  FundProjectionScreenOutlined,
  PartitionOutlined,
  SettingOutlined,
  FileSearchOutlined,
  RobotOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  ControlOutlined,
  SlackOutlined,
  EnvironmentOutlined,
  KeyOutlined,
  SafetyOutlined,
  GroupOutlined,
  CloudServerOutlined,
  ClusterOutlined,
  LineChartOutlined,
  FileOutlined
} from '@vicons/antd'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user/user'
import { timezoneList } from '@/common/timezone'
import type { UserInfoRes } from '@/service/modules/users/types'

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
    const projectCode = route.params.projectCode || 'TestProjectCode'
    const projectName = route.query.projectName || '테스트'
    state.menuOptions = [
      {
        label: () => h(NEllipsis, null, '홈'),
        key: 'home',
        icon: renderIcon(HomeOutlined)
        
        /** 임시 퍼블 메뉴 시작 */
        , children: [
          {
            label: 'Pub1',
            key: '/publish/pub1',
          },
          {
            label: 'Pub2',
            key: '/publish/pub2',
          },
          {
            label: 'Pub3',
            key: '/publish/pub3',
          },
          {
            label: 'Pub4',
            key: '/publish/pub4',
          },
          {
            label: 'Pub5',
            key: '/publish/pub5',
          },
        ]
        /** 임시 퍼블 메뉴 끝 */
      },
      {
        label: () => h(NEllipsis, null, '프로젝트'),
        key: 'projects',
        icon: renderIcon(ProfileOutlined),
        children: [
          {
            label: 'Project' + (projectName ? `[${projectName}]` : ''),
            key: `/projects/${projectCode}`,
            icon: renderIcon(FundProjectionScreenOutlined),
            payload: { projectName: projectName },
            children: [
              {
                label: '프로젝트 개요',
                key: `/projects/${projectCode}`,
                payload: { projectName: projectName }
              },
              {
                label: '프로젝트 매개변수',
                key: `/projects/${projectCode}/parameter`,
                payload: { projectName: projectName }
              },
              {
                label: '프로젝트 기본설정',
                key: `/projects/${projectCode}/preferences`,
                payload: { projectName: projectName }
              }
            ]
          },
          {
            label: '워크플로우',
            key: 'workflow',
            icon: renderIcon(PartitionOutlined),
            children: [
              {
                label: '워크플로우 관계',
                key: `/projects/${projectCode}/workflow/relation`,
                payload: { projectName: projectName }
              },
              {
                label: '워크플로우 정의',
                key: `/projects/${projectCode}/workflow-definition`,
                payload: { projectName: projectName }
              },
              {
                label: '워크플로우 실행 인스턴스',
                key: `/projects/${projectCode}/workflow/instances`,
                payload: { projectName: projectName }
              },
              {
                label: '워크플로우 스케줄 설정 ',
                key: `/projects/${projectCode}/workflow/timings`,
                payload: { projectName: projectName }
              }
            ]
          },
          {
            label: '작업',
            key: 'task',
            icon: renderIcon(SettingOutlined),
            children: [
              {
                label: '작업 정의',
                key: `/projects/${projectCode}/task/definitions`,
                payload: { projectName: projectName }
              },
              {
                label: '작업 실행 인스턴스',
                key: `/projects/${projectCode}/task/instances`,
                payload: { projectName: projectName }
              }
            ]
          }
        ]
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
      },
      {
        label: () =>
          h(NEllipsis, null, '데이터소스'),
        key: 'datasource',
        icon: renderIcon(DatabaseOutlined),
        children: []
      },
      {
        label: () => h(NEllipsis, null, '모니터링'),
        key: 'monitor',
        icon: renderIcon(DesktopOutlined),
        children: [
          {
            label: '서비스 관리',
            key: 'service-manage',
            icon: renderIcon(AppstoreOutlined),
            children: [
              {
                label: '마스터',
                key: '/monitor/master'
              },
              {
                label: '워커',
                key: '/monitor/worker'
              },
              {
                label: '알람서버',
                key: '/monitor/alert_server'
              },
              {
                label: 'DB',
                key: '/monitor/db'
              }
            ]
          },
          {
            label: '통계관리',
            key: 'statistical-manage',
            icon: renderIcon(AppstoreOutlined),
            children: [
              {
                label: '통계',
                key: '/monitor/statistics'
              },
              {
                label: '감시 로그',
                key: '/monitor/audit-log'
              }
            ]
          }
        ]
      },
      {
        label: () => h(NEllipsis, null, '보안 관리'),
        key: 'security',
        icon: renderIcon(SafetyCertificateOutlined),
        children:
          (userStore.getUserInfo as UserInfoRes).userType === 'ADMIN_USER'
            ? [
                {
                  label: '테넌트 관리',
                  key: '/security/tenant-manage',
                  icon: renderIcon(UsergroupAddOutlined)
                },
                {
                  label: '사용자 관리',
                  key: '/security/user-manage',
                  icon: renderIcon(UserAddOutlined)
                },
                {
                  label: '알람 그룹 관리',
                  key: '/security/alarm-group-manage',
                  icon: renderIcon(WarningOutlined)
                },
                {
                  label: '알람 인스턴스 관리',
                  key: '/security/alarm-instance-manage',
                  icon: renderIcon(InfoCircleOutlined)
                },
                {
                  label: 'Worker 그룹 관리',
                  key: '/security/worker-group-manage',
                  icon: renderIcon(ControlOutlined)
                },
                {
                  label: 'Yarn 대기열 관리',
                  key: '/security/yarn-queue-manage',
                  icon: renderIcon(SlackOutlined)
                },
                {
                  label: '환경 관리',
                  key: '/security/environment-manage',
                  icon: renderIcon(EnvironmentOutlined)
                },
                {
                  label: '클러스터 관리',
                  key: '/security/cluster-manage',
                  icon: renderIcon(ClusterOutlined)
                },
                {
                  label: 'K8S 네임스페이스 관리',
                  key: '/security/k8s-namespace-manage',
                  icon: renderIcon(CloudServerOutlined)
                },
                {
                  label: '토큰 관리',
                  key: '/security/token-manage',
                  icon: renderIcon(SafetyOutlined)
                }
              ]
            : [
                {
                  label: '토큰 관리',
                  key: '/security/token-manage',
                  icon: renderIcon(SafetyOutlined)
                }
              ]
      },
      {
        label: () => h(NEllipsis, null, '예측'),
        key: 'prediction',
        icon: renderIcon(LineChartOutlined),
        children: [
          {
            label: '일간 스케줄',
            key: 'day-schedule',
            icon: renderIcon(AppstoreOutlined),
            children: [
              {
                label: '스케줄 정보',
                key: '/prediction/day-schedule/schedule-info'
              },
              {
                label: '시간대 현황',
                key: '/prediction/day-schedule/time-status'
              }
            ]
          },
          {
            label: '월간 스케줄',
            key: '/prediction/month-schedule',
            icon: renderIcon(AppstoreOutlined),
          }
        ]
      },
      {
        label: () => h(NEllipsis, null, '리포트'),
        key: 'report',
        icon: renderIcon(FileOutlined),
        children: [
          {
            label: 'Top-N 결과 분석',
            key: '/report/top-n-analysis',
            icon: renderIcon(AppstoreOutlined)
          },
          {
            label: '상세 실행 내역',
            key: '/report/detail-history',
            icon: renderIcon(AppstoreOutlined)
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
