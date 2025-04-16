import { reactive, ref, SetupContext } from 'vue'
import { Option } from 'naive-ui/es/transfer/src/interface'
import { queryAllWorkerGroups } from '@/service/modules/worker-groups'
import {
  queryWorkerGroupsByProjectCode,
  assignWorkerGroups
} from '@/service/modules/projects-worker-group'
import { UpdateProjectWorkerGroupsReq } from '@/service/modules/projects-worker-group/types'

export function useWorkerGroup(
  props: any,
  ctx: SetupContext<('cancelModal' | 'confirmModal')[]>
) {
  const variables = reactive({
    model: {
      workerGroupOptions: [] as Option[],
      assignedWorkerGroups: ref([] as any)
    }
  })

  const initOptions = () => {
    variables.model.workerGroupOptions = []
    queryAllWorkerGroups().then((res: any) => {
      for (const workerGroup of res) {
        variables.model.workerGroupOptions.push({
          label: workerGroup,
          value: workerGroup,
          disabled: workerGroup === 'default'
        })
      }
    })
  }

  const initAssignedWorkerGroups = (projectCode: number) => {
    variables.model.assignedWorkerGroups = ref([] as any)
    queryWorkerGroupsByProjectCode(projectCode).then((res: any) => {
      res.data.forEach((item: any) => {
        variables.model.assignedWorkerGroups.push(item.workerGroup)
      })
    })
  }

  initOptions()

  const handleValidate = () => {
    if (variables.model?.assignedWorkerGroups.length > 0) {
      submitModal()
      ctx.emit('confirmModal', props.showModalRef)
    }
  }

  const submitModal = async () => {
    if (props.row.code) {
      const data: UpdateProjectWorkerGroupsReq = {
        workerGroups:
          variables.model.assignedWorkerGroups.length > 0
            ? variables.model.assignedWorkerGroups.join(',')
            : ''
      }
      assignWorkerGroups(data, props.row.code)
    }
  }

  return { variables, handleValidate, initAssignedWorkerGroups }
}
