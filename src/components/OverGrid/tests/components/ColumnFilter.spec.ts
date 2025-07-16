import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ColumnFilter from '../../components/ColumnFilter.vue'
import { OverGridField } from '../../types/OverGridField'
import type { OverGridColumnFilter } from '../../types/OverGridColumnFilter'
import { ref } from 'vue'

describe('ColumnFilter.vue', () => {
  const fieldMock = new OverGridField('testField', 'Test Field', null)

  const mockColumnFilter = {
    filters: ref<OverGridColumnFilter[]>([]),
    isFieldActive: vi.fn(),
    toggleColumnFilter: vi.fn(),
    fieldUnderAdding: ref<OverGridField | null>(null),
    closeColumnFilterConfigModal: vi.fn(),
    registerColumnFilter: vi.fn(),
    initiateColumnFilter: vi.fn(),
    removeColumnFilter: vi.fn(),
    editColumnFilter: vi.fn(),
    returnCurrentFilter: vi.fn(),
  }

  const mountComponent = (isActive: boolean) => {
    mockColumnFilter.isFieldActive.mockReturnValue(isActive)

    return mount(ColumnFilter, {
      props: {
        field: fieldMock,
        config: {
          active: true,
        },
        columnFilter: mockColumnFilter,
      },
      global: {
        stubs: ['Dropdown', 'OverGridBtn', 'OverGridIcon'],
        mocks: {
          useI18n: () => ({
            l: (key: string) => key,
          }),
        },
      },
    })
  }

  it('renders filter button if field is not active', () => {
    // Todo: Fix this test to check for right button existence
    const wrapper = mountComponent(false)
    const filterBtn = wrapper.findComponent({ name: 'OverGridBtn' })

    expect(filterBtn.exists()).toBe(true)
    expect(mockColumnFilter.isFieldActive).toHaveBeenCalledWith(fieldMock)
  })

  // it('clicking filter button calls initiateColumnFilter', async () => {
  //   const wrapper = mountComponent(false)
  //   const filterBtn = wrapper.findComponent({ name: 'OverGridBtn' })

  //   await filterBtn.trigger('click')
  //   expect(mockColumnFilter.initiateColumnFilter).toHaveBeenCalledWith(fieldMock)
  // })

  // it('renders dropdown if field is active', () => {
  //   const wrapper = mountComponent(true)
  //   const dropdown = wrapper.findComponent({ name: 'Dropdown' })

  //   expect(dropdown.exists()).toBe(true)
  // })

  // it('clicking edit option calls editColumnFilter and closes dropdown', async () => {
  //   const wrapper = mountComponent(true)

  //   // mock dropdown ref with close method
  //   const closeMock = vi.fn()
  //   ;(wrapper.vm as any).columnFilterDropdown = { close: closeMock }

  //   const editLink = wrapper.findAll('a').at(0)
  //   await editLink?.trigger('click')

  //   expect(mockColumnFilter.editColumnFilter).toHaveBeenCalledWith(fieldMock)
  //   expect(closeMock).toHaveBeenCalled()
  // })

  // it('clicking remove option calls removeColumnFilter and closes dropdown', async () => {
  //   const wrapper = mountComponent(true)

  //   const closeMock = vi.fn()
  //   ;(wrapper.vm as any).columnFilterDropdown = { close: closeMock }

  //   const removeLink = wrapper.findAll('a').at(1)
  //   await removeLink?.trigger('click')

  //   expect(mockColumnFilter.removeColumnFilter).toHaveBeenCalledWith(fieldMock)
  //   expect(closeMock).toHaveBeenCalled()
  // })
})
