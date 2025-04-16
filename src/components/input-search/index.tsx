import { defineComponent, withKeys, PropType } from 'vue'
import { NInput } from 'naive-ui'

const props = {
  placeholder: {
    type: String as PropType<string>,
    required: false
  }
}

const Search = defineComponent({
  name: 'Search',
  props: props,
  emits: ['search', 'clear'],
  setup(props, ctx) {
    const onKeyDown = (ev: KeyboardEvent) => {
      ctx.emit('search', (ev.target as HTMLInputElement)?.value || '')
    }
    const onClear = (ev: Event) => {
      ctx.emit('clear', (ev.target as HTMLInputElement)?.value || '')
    }
    return () => (
      <NInput
        size='small'
        clearable
        placeholder={
          props.placeholder ? props.placeholder : '키워드 입력'
        }
        onKeydown={withKeys(onKeyDown, ['enter'])}
        onClear={onClear}
      />
    )
  }
})

export default Search
