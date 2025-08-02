import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BulkOperationsDropdown from '../../components/BulkOperationsDropdown.vue'
import type { Ref } from 'vue'
import { compile, computed, ref } from 'vue'

describe('BulkOperationsDropdown', () => {
  const mockAction = vi.fn()

  const createWrapper = (checkedRows: Ref<string[]>) => {
    return mount(BulkOperationsDropdown, {
      props: {
        config: {
          active: true,
          methods: [
            { key: 'delete', title: 'Delete', action: mockAction },
            { key: 'archive', title: 'Archive', action: vi.fn() },
          ],
        },
        bulkOperator: {
          checkedRows: checkedRows,
          isToolbarOptionEnabled: computed(() => checkedRows.value.length > 0),
        },
      },
      global: {
        stubs: ['OverGridSelect'],
        mocks: {
          // ha nem stubolod a komponenst, ide jön az i18n mock
          useI18n: () => ({
            l: vi.fn((key: string, { selectedCount }) => `Selected: ${selectedCount}`),
          }),
        },
      },
    })
  }

  it('should render properly', () => {
    const wrapper = createWrapper(ref(['1', '2']))
    expect(wrapper.exists()).toBe(true)
  })

  it('should disable select if no rows are selected', () => {
    const wrapper = createWrapper(ref([]))
    expect(wrapper.findComponent({ name: 'OverGridSelect' }).props('disabled')).toBe(true)
  })

  it('should enable select if rows are selected', () => {
    const wrapper = createWrapper(ref(['1']))
    expect(wrapper.findComponent({ name: 'OverGridSelect' }).props('disabled')).toBe(false)
  })

  it('should call correct action when method selected', async () => {
    const wrapper = createWrapper(ref(['1']))
    const select = wrapper.findComponent({ name: 'OverGridSelect' })

    // Szimuláljuk a v-model változást
    await select.vm.$emit('update:modelValue', 'delete')
    await select.vm.$emit('change')

    expect(mockAction).toHaveBeenCalledWith(['1'], expect.any(Function))
  })
})
