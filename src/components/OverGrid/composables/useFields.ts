import { OverGridField } from '../types/OverGridField'
import { ref, computed } from 'vue'

export default () => {
  const mapping = ref<OverGridField[]>([])

  const mappingVisible = computed<any[]>(() => {
    return mapping.value.filter((field, index) => {
      return field.visible !== false
    })
  })

  const addField = (key: string, title: string) => {
    let field = new OverGridField(key, title)
    mapping.value.push(field)
    return field
  }

  const addNumberField = (key: string, title: string) => {
    let field = addField(key, key)
    return field
  }

  return {
    mapping,
    mappingVisible,
    addField,
    addNumberField,
  }
}
