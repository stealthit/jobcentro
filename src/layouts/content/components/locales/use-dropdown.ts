import { DropdownOption } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import cookies from 'js-cookie'

export function useDropDown(chooseVal: any) {
  const { locale } = useI18n()

  const handleSelect = (key: string | number, option: DropdownOption) => {
    // console.log(key, option)
    chooseVal.value = option.label
    locale.value = 'koKR'
    cookies.set('language', 'koKR', { path: '/' })
  }
  return {
    handleSelect
  }
}
