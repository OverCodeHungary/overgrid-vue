import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OverGridBtn from '../../components/OverGridBtn.vue'

describe('OverGridBtn.vue', () => {
  it('renders default OverGridBtn', () => {
    const wrapper = mount(OverGridBtn)
    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('button') // default type
    expect(button.classes()).toContain('cursor-pointer')
  })

  it('renders slot content', () => {
    const wrapper = mount(OverGridBtn, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('does not render text span when iconOnly is true', () => {
    const wrapper = mount(OverGridBtn, {
      props: {
        iconOnly: true,
      },
      slots: {
        default: 'Hidden text',
      },
    })

    expect(wrapper.find('span').exists()).toBe(false)
  })

  it('applies variant class', () => {
    const wrapper = mount(OverGridBtn, {
      props: {
        variant: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('overgrid-btn-primary')
  })

  it('applies size class', () => {
    const wrapper = mount(OverGridBtn, {
      props: {
        size: 'lg',
      },
    })
    expect(wrapper.classes()).toContain('text-lg')
    expect(wrapper.classes().some((c) => c.includes('py-3'))).toBe(true)
  })

  it('applies rounded-full for iconOnly rounded OverGridBtn', () => {
    const wrapper = mount(OverGridBtn, {
      props: {
        rounded: true,
        iconOnly: true,
      },
    })
    expect(wrapper.classes()).toContain('rounded-full')
  })

  it('applies rounded-lg for rounded text OverGridBtn', () => {
    const wrapper = mount(OverGridBtn, {
      props: {
        rounded: true,
        iconOnly: false,
      },
    })
    expect(wrapper.classes()).toContain('rounded-lg')
  })

  it('applies customClass', () => {
    const wrapper = mount(OverGridBtn, {
      props: {
        customClass: 'my-custom-class',
      },
    })
    expect(wrapper.classes()).toContain('my-custom-class')
  })

  it('sets OverGridBtn type correctly', () => {
    const wrapper = mount(OverGridBtn, {
      props: {
        type: 'submit',
      },
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('sets disabled attribute', () => {
    const wrapper = mount(OverGridBtn, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed')
  })

  it('renders iconLeft and iconRight slots', () => {
    const wrapper = mount(OverGridBtn, {
      slots: {
        iconLeft: '<span class="icon-left">L</span>',
        iconRight: '<span class="icon-right">R</span>',
      },
    })

    expect(wrapper.find('.icon-left').exists()).toBe(true)
    expect(wrapper.find('.icon-right').exists()).toBe(true)
  })
})
