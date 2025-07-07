import { OverGridField } from '../types/OverGridField'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { OverGridEnumMapping } from '../types/OverGridEnumMapping'

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

  addNumberField(key: string, title: string, extraConfig: any = {}) {
    let field: OverGridField = this.addField(key, title)
    field.columnFilter = {
      active: true,
      type: 'number',
      config: {},
      ...(extraConfig.columnFilter ? extraConfig.columnFilter : {}),
    }
    return field
  }

  addTextField(key: string, title: string, extraConfig: any = {}) {
    let field: OverGridField = this.addField(key, title)
    field.columnFilter = {
      active: true,
      type: 'text',
      config: {},
      ...(extraConfig.columnFilter ? extraConfig.columnFilter : {}),
    }
    return field
  }

  addDateField(key: string, title: string, extraConfig: any = {}) {
    let field: OverGridField = this.addField(key, title)
    field.columnFilter = {
      active: true,
      type: 'date',
      config: {},
      ...(extraConfig.columnFilter ? extraConfig.columnFilter : {}),
    }
    return field
  }

  addEnumField(key: string, title: string, enumMapping: OverGridEnumMapping, extraConfig: any = {}) {
    let field: OverGridField = this.addField(key, title)
    field.columnFilter = {
      active: true,
      type: 'enum',
      config: {
        mapping: enumMapping,
      },
      ...(extraConfig.columnFilter ? extraConfig.columnFilter : {}),
    }
    return field
  }

  addBooleanField(key: string, title: string, extraConfig: any = {}) {
    let field: OverGridField = this.addField(key, title)
    field.columnFilter = {
      active: true,
      type: 'boolean',
      config: {},
      ...(extraConfig.columnFilter ? extraConfig.columnFilter : {}),
    }
    return field
  }
}

export default (): OverGridFields => {
  return new OverGridFields()
}
