import { h, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { bytesToSize } from '@/common/common'
import TableAction from './table-action'
import { IRenameResource, IReuploadResource, ResourceType } from '../types'
import ButtonLink from '@/components/button-link'
import { NEllipsis } from 'naive-ui'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import type { Router } from 'vue-router'
import { useFileState } from '@/views/resource/components/resource/use-file'
import { defineStore } from 'pinia'

const goSubFolder = (router: Router, item: any) => {
  if (item.directory) {
    router.push({
      name:
        item.type === 'UDF'
          ? 'resource-sub-manage'
          : 'resource-file-subdirectory',
      query: { prefix: item.fullName, tenantCode: item.user_name }
    })
  } else if (item.type === 'FILE') {
    router.push({
      name: 'resource-file-list',
      query: { prefix: item.fullName, tenantCode: item.user_name }
    })
  }
}

export function useTable() {
  const router: Router = useRouter()

  const variables = reactive({
    columns: [],
    fullName: ref(String(router.currentRoute.value.query.prefix || '')),
    tenantCode: ref(String(router.currentRoute.value.query.tenantCode || '')),
    resourceType: ref<ResourceType>(),
    resourceList: ref(),
    folderShowRef: ref(false),
    uploadShowRef: ref(false),
    isReupload: ref(false),
    renameShowRef: ref(false),
    searchRef: ref(),
    renameInfo: ref({
      name: '',
      description: '',
      fullName: '',
      user_name: ''
    }),
    reuploadInfo: ref({
      name: '',
      description: '',
      fullName: '',
      user_name: ''
    }),
    pagination: ref({
      page: 1,
      pageSize: 10,
      itemCount: 0,
      pageSizes: [10, 30, 50]
    })
  })

  const createColumns = (variables: any) => {
    variables.columns = [
      {
        title: '구분',
        key: 'id',
        ...COLUMN_WIDTH_CONFIG['index'],
        render: (_row: any, index: number) => index + 1
      },
      {
        title: '이름',
        key: 'name',
        ...COLUMN_WIDTH_CONFIG['linkName'],
        render: (row: any) => {
          return !row.directory
            ? row.alias
            : h(
                ButtonLink,
                {
                  onClick: () => goSubFolder(router, row)
                },
                {
                  default: () =>
                    h(
                      NEllipsis,
                      COLUMN_WIDTH_CONFIG['linkEllipsis'],
                      () => row.alias
                    )
                }
              )
        }
      },
      {
        title: '리소스 실행 테넌트',
        ...COLUMN_WIDTH_CONFIG['userName'],
        key: 'user_name'
      },
      {
        title: '폴더 여부',
        key: 'whether_directory',
        ...COLUMN_WIDTH_CONFIG['yesOrNo'],
        render: (row: any) =>
          row.directory ? 'Yes' : 'No'
      },
      {
        title: '파일명',
        ...COLUMN_WIDTH_CONFIG['name'],
        key: 'file_name'
      },
      {
        title: '사이즈',
        key: 'size',
        ...COLUMN_WIDTH_CONFIG['size'],
        render: (row: any) => bytesToSize(row.size)
      },
      {
        title: '생성일시',
        ...COLUMN_WIDTH_CONFIG['time'],
        key: 'create_time'
      },
      {
        title: '수정일시',
        ...COLUMN_WIDTH_CONFIG['time'],
        key: 'update_time'
      },
      {
        title: '액션',
        key: 'operation',
        render: (row: any) =>
          h(TableAction, {
            row,
            onReuploadResource: (name, description, fullName, user_name) =>
              reuploadResource(name, description, fullName, user_name),
            onRenameResource: (name, description, fullName, user_name) =>
              renameResource(name, description, fullName, user_name),
            onUpdateList: () => updateList()
          }),
        ...COLUMN_WIDTH_CONFIG['operation'](
          variables.resourceType === 'UDF' ? 4 : 5
        )
      }
    ]
  }

  const createFile = () => {
    const { fullName } = variables
    const name = fullName ? 'resource-subfile-create' : 'resource-file-create'
    router.push({
      name,
      params: { id: fullName }
    })
  }

  const reuploadResource: IReuploadResource = (
    name,
    description,
    fullName,
    user_name
  ) => {
    variables.reuploadInfo = {
      name: name,
      description: description,
      fullName: fullName,
      user_name: user_name
    }
    variables.isReupload = true
    variables.uploadShowRef = true
  }

  const renameResource: IRenameResource = (
    name,
    description,
    fullName,
    user_name
  ) => {
    variables.renameInfo = {
      name: name,
      description: description,
      fullName: fullName,
      user_name: user_name
    }
    variables.renameShowRef = true
  }

  const setPagination = (count: number) => {
    variables.pagination.itemCount = count
  }

  const { getResourceListState } = useFileState(setPagination)
  const detailPageStore = useDetailPageStore()

  const requestData = () => {
    variables.resourceList = getResourceListState(
      variables.resourceType!,
      variables.fullName,
      variables.tenantCode,
      variables.searchRef,
      variables.pagination.page,
      variables.pagination.pageSize
    )
    detailPageStore.setResourceType(variables.resourceType!)
    detailPageStore.setFullName(variables.fullName)
    detailPageStore.setTenantCode(variables.tenantCode)
    detailPageStore.setSearchValue(variables.searchRef)
    detailPageStore.setPage(variables.pagination.page)
    detailPageStore.setPageSize(variables.pagination.pageSize)
  }

  const updateList = () => {
    variables.pagination.page = 1
    requestData()
  }

  return {
    variables,
    tableWidth: calculateTableWidth(variables.columns) || DefaultTableWidth,
    requestData,
    updateList,
    createColumns,
    handleCreateFile: createFile
  }
}
export const useDetailPageStore = defineStore('detailPage', {
  state: () => {
    let resourceTypeInitValue: ResourceType
    return {
      resourceType: resourceTypeInitValue!,
      fullName: '',
      tenantCode: '',
      searchValue: '',
      page: 1,
      pageSize: 10
    }
  },
  getters: {
    getResourceType(): ResourceType {
      return this.resourceType
    },
    getFullName(): string {
      return this.fullName
    },
    getTenantCode(): string {
      return this.tenantCode
    },
    getSearchValue(): string {
      return this.searchValue
    },
    getPage(): number {
      return this.page
    },
    getPageSize(): number {
      return this.pageSize
    }
  },
  actions: {
    setResourceType(resourceTypeValue: ResourceType) {
      this.resourceType = resourceTypeValue
    },
    setFullName(fullName: string) {
      this.fullName = fullName
    },
    setTenantCode(tenantCode: string) {
      this.tenantCode = tenantCode
    },
    setSearchValue(searchValue: string) {
      this.searchValue = searchValue
    },
    setPage(page: number) {
      this.page = page
    },
    setPageSize(pageSize: number) {
      this.pageSize = pageSize
    }
  }
})
