import { reactive, ref, SetupContext } from 'vue'
import { useUserStore } from '@/store/user/user'
import type { FormRules } from 'naive-ui'
import type { UserInfoRes } from '@/service/modules/users/types'
import { createProject, updateProject } from '@/service/modules/projects'

export function useForm(
  props: any,
  ctx: SetupContext<('cancelModal' | 'confirmModal')[]>
) {
  const userStore = useUserStore()

  const resetForm = () => {
    variables.model = {
      projectName: '',
      description: '',
      userName: (userStore.getUserInfo as UserInfoRes).userName
    }
  }

  const variables = reactive({
    projectFormRef: ref(),
    model: {
      projectName: '',
      description: '',
      userName: (userStore.getUserInfo as UserInfoRes).userName
    },
    saving: false,
    rules: {
      projectName: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (variables.model.projectName === '') {
            return new Error('Please enter your project')
          }
        }
      },
      userName: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (variables.model.userName === '') {
            return new Error('Please enter your username')
          }
        }
      }
    } as FormRules
  })

  const handleValidate = (statusRef: number) => {
    variables.projectFormRef.validate((errors: any) => {
      if (!errors) {
        statusRef === 0 ? submitProjectModal() : updateProjectModal()
      } else {
        return
      }
    })
  }

  const submitProjectModal = async () => {
    if (variables.saving) return
    variables.saving = true
    try {
      await createProject(variables.model)
      variables.saving = false
      resetForm()
      ctx.emit('confirmModal', props.showModalRef)
    } catch (err) {
      variables.saving = false
    }
  }

  const updateProjectModal = async () => {
    if (variables.saving) return
    variables.saving = true
    try {
      await updateProject(variables.model, props.row.code)
      variables.saving = false
      resetForm()
      ctx.emit('confirmModal', props.showModalRef)
    } catch (err) {
      variables.saving = false
    }
  }

  return { variables, handleValidate }
}
