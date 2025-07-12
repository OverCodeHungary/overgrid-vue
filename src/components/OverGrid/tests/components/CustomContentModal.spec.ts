import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomContentModal from '../../components/CustomContentModal.vue'

describe('CustomContentModal', () => {
  const factory = (props = {}, slots = {}) => {
    return mount(CustomContentModal, {
      props: {
        show: true,
        title: 'Test Modal Title',
        close: vi.fn(),
        ...props,
      },
      slots: {
        content: '<div class="slot-content">Content here</div>',
        ...slots,
      },
    })
  }

  it('renders with title and content', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Test Modal Title')
    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })

  it('calls close when cancel button is clicked', async () => {
    const close = vi.fn()
    const wrapper = factory({ close })
    await wrapper.find('.overgrid-btn-modal-cancel').trigger('click')
    expect(close).toHaveBeenCalled()
  })

  it('calls ok when ok button is clicked', async () => {
    const ok = vi.fn()
    const wrapper = factory({ ok })
    await wrapper.find('.overgrid-btn-modal-ok').trigger('click')
    expect(ok).toHaveBeenCalled()
  })

  it('disables OK button when disableOkButton is true', () => {
    const wrapper = factory({ disableOkButton: true })
    const okButton = wrapper.find('.overgrid-btn-modal-ok')
    expect(okButton.attributes('disabled')).toBeDefined()
  })

  it('shows loader instead of OK text when okButtonLoading is true', () => {
    const wrapper = factory({ okButtonLoading: true })
    expect(wrapper.findComponent({ name: 'SpinnerLoader' }).exists()).toBe(true)
    expect(wrapper.find('.overgrid-btn-modal-ok').text()).not.toContain('ok')
  })

  it('hides OK button if noNeedOkButton is true', () => {
    const wrapper = factory({ noNeedOkButton: true })
    expect(wrapper.find('.overgrid-btn-modal-ok').exists()).toBe(false)
  })

  it('does not render footer if disableButtons is true', () => {
    const wrapper = factory({ disableButtons: true })
    expect(wrapper.find('.overgrid-modal-buttons-bar').exists()).toBe(false)
  })

  it('toggles visibility with prop change', async () => {
    const wrapper = factory({ show: false })
    expect(wrapper.vm.$el.querySelector('.overgrid-modal')?.style.display).toBe('none')

    await wrapper.setProps({ show: true })
    expect(wrapper.vm.$el.querySelector('.overgrid-modal')?.style.display).not.toBe('none')
  })
})
