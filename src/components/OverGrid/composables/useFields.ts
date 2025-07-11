import { OverGridField } from '../types/OverGridField'
import { ref } from 'vue'
import type { OverGridActionButton } from '../types/OverGridActionButton'
import type { Ref } from 'vue'
import type { OverGridEnumMapping } from '../types/OverGridEnumMapping'

class OverGridFields {
  mapping: Ref<OverGridField[]>
  actionButtonFieldCounter: number = 0

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
    field.formatter = {
      type: 'EnumFormatter',
      config: {
        mapping: enumMapping,
      },
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
    field.setFormatter('BooleanFormatter')
    return field
  }

  addActionButtonField(title: string, buttons: OverGridActionButton[]) {
    let field: OverGridField = this.addField('actionButtons_' + this.actionButtonFieldCounter++, title)
    field.setFormatter('ActionButtonsFormatter', {
      buttons: buttons,
    })
    field.exportable = false // Action buttons are not exportable by default
    field.columnFilter = {
      active: false, // Action buttons do not have filters
    }
    field.selectable = false // Action buttons are not selectable by default
    field.orderable = false // Action buttons are not orderable by default
    return field
  }
}

export default (): OverGridFields => {
  return new OverGridFields()
}
