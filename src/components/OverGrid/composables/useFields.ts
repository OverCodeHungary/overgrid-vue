import { OverGridField } from '../types/OverGridField'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

class OverGridFields {
  mapping: Ref<OverGridField[]>

  constructor() {
    this.mapping = ref<OverGridField[]>([])
  }

  mappingVisible = (): OverGridField[] => {
    return this.mapping.value.filter((field) => field.visible !== false)
  }

  addField(key: string, title: string): OverGridField {
    let field = new OverGridField(key, title, this)
    this.mapping.value.push(field)
    return field
  }

  addNumberField(key: string, title: string) {
    let field: OverGridField = this.addField(key, title)
    return this
  }

  addTextField(key: string, title: string) {
    let field: OverGridField = this.addField(key, title)
    return this
  }

  addDateField(key: string, title: string) {
    let field: OverGridField = this.addField(key, title)
    return this
  }

  addEnumField(key: string, title: string) {
    let field: OverGridField = this.addField(key, title)
    return this
  }

  addBooleanField(key: string, title: string) {
    let field: OverGridField = this.addField(key, title)
    return this
  }
}

export default (): OverGridFields => {
  return new OverGridFields()
}
