import { reactive, ref, unref } from 'vue'
import type { FormRules } from 'naive-ui'
import {
  IRenameDefaultValue,
  ResourceType
} from '@/views/resource/components/resource/types'

const defaultValue: IRenameDefaultValue = (
  type: ResourceType,
  fullName = '',
  name = '',
  description = '',
  user_name = ''
) => ({
  fullName,
  name,
  type: type,
  description,
  user_name
})

export function useForm(
  resourceType: ResourceType,
  fullName: string,
  name: string,
  description: string,
  user_name: string
) {
  const resetForm = () => {
    state.renameForm = Object.assign(
      unref(state.renameForm),
      defaultValue(resourceType)
    )
  }

  const state = reactive({
    renameFormRef: ref(),
    renameForm: defaultValue(
      resourceType,
      fullName,
      name,
      description,
      user_name
    ),
    saving: false,
    rules: {
      name: {
        required: true,
        trigger: ['input', 'blur'],
        validator() {
          if (state.renameForm.name === '') {
            return new Error('Please enter name')
          }
        }
      }
    } as FormRules
  })

  return {
    state,
    resetForm
  }
}
