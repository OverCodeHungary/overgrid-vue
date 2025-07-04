import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Orderer from '../../components/Orderer.vue'
import { ref } from 'vue'

const baseProps = {
  field: 'testField',
  config: {},
}

const createWrapper = (overrides = {}) => {
  const mockOrderer = {
    isFieldActive: vi.fn().mockReturnValue(false),
    getFieldOrderDirection: vi.fn().mockReturnValue(undefined),
    toggleOrderDirection: vi.fn(),
    removeOrder: vi.fn(),
    addOrder: vi.fn(),
    rawState: ref([]),
    state: [],
    ...overrides,
  }

  const mockField = {
    key: 'testField',
    title: 'Test Field',
    fieldsObject: {},
    commit: vi.fn(),
  }

  return mount(Orderer, {
    props: {
      ...baseProps,
      orderer: mockOrderer,
      field: mockField,
      config: {
        active: true,
      },
    },
  })
}

describe('OrderButton', () => {
  it('shows add button when field is not active', () => {
    const wrapper = createWrapper({ isFieldActive: vi.fn().mockReturnValue(false) })
    expect(wrapper.findAll('[data-test="add-button"]')).toHaveLength(1)
  })

  it('not showing remove button when field is not active', () => {
    const wrapper = createWrapper({ isFieldActive: vi.fn().mockReturnValue(false) })
    expect(wrapper.findAll('[data-test="remove-button"]')).toHaveLength(0)
  })

  it('shows ASC + remove buttons when field is active and direction is DESC', () => {
    const wrapper = createWrapper({
      isFieldActive: vi.fn().mockReturnValue(true),
      getFieldOrderDirection: vi.fn().mockReturnValue('DESC'),
    })
    expect(wrapper.findAll('[data-test="asc-button"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test="remove-button"]')).toHaveLength(1)
  })

  it('shows DESC + remove buttons when field is active and direction is ASC', () => {
    const wrapper = createWrapper({
      isFieldActive: vi.fn().mockReturnValue(true),
      getFieldOrderDirection: vi.fn().mockReturnValue('ASC'),
    })
    expect(wrapper.findAll('[data-test="desc-button"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-test="remove-button"]')).toHaveLength(1)
  })
})
