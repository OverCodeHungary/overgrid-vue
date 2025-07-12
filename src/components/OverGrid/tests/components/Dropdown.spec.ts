import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from '../../components/Dropdown.vue'
import { nextTick } from 'vue'

describe('Dropdown.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Dropdown, {
      props: {
        orientation: 'left',
        extraClass: 'w-[250px]',
      },
      slots: {
        iconButton: '<button id="toggle">Toggle</button>',
        content: '<div id="dropdown-content">Dropdown Content</div>',
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders iconButton and content slot (but content hidden by default)', () => {
    expect(wrapper.find('#toggle').exists()).toBe(true)
    expect(wrapper.find('#dropdown-content').exists()).toBe(true)
    // Content should be in DOM but hidden
    expect(wrapper.vm.$el.querySelector('.overgrid-dropdown-panel')?.style.display).toBe('none')
  })

  it('opens dropdown on iconButton click', async () => {
    await wrapper.find('#toggle').trigger('click')
    expect(wrapper.vm.$el.querySelector('.overgrid-dropdown-panel')?.getAttribute('style')).not.toContain(
      'display: none',
    )
  })

  it('adds left-0 class when orientation is "right"', async () => {
    wrapper = mount(Dropdown, {
      props: {
        orientation: 'right',
      },
      slots: {
        iconButton: '<button id="toggle">Toggle</button>',
        content: '<div>Dropdown Content</div>',
      },
    })

    await wrapper.find('#toggle').trigger('click')
    const panel = wrapper.find('.overgrid-dropdown-panel')
    expect(panel.classes()).toContain('left-0')
  })

  it('adds extraClass to dropdown panel', async () => {
    wrapper = mount(Dropdown, {
      props: {
        extraClass: 'w-[100px]',
      },
      slots: {
        iconButton: '<button id="toggle">Toggle</button>',
        content: '<div>Dropdown Content</div>',
      },
    })

    await wrapper.find('#toggle').trigger('click')
    expect(wrapper.find('.overgrid-dropdown-panel').classes()).toContain('w-[100px]')
  })

  it('should toggle open and close on click and outside click', async () => {
    const toggle = wrapper.find('#toggle')
    await toggle.trigger('click')
    await nextTick()

    expect(wrapper.vm.$el.querySelector('.overgrid-dropdown-panel')?.style.display).not.toBe('none')

    document.body.click() // Simulate outside click
    await new Promise((resolve) => setTimeout(resolve, 1000))

    expect(wrapper.vm.$el.querySelector('.overgrid-dropdown-panel')?.style.display).toBe('none')
  })

  it('closes when calling exposed close()', async () => {
    await wrapper.find('#toggle').trigger('click')
    const vm = wrapper.vm as unknown as { close: () => void }

    expect(wrapper.vm.$el.querySelector('.overgrid-dropdown-panel')?.style.display).not.toBe('none')
    vm.close()

    await new Promise((resolve) => setTimeout(resolve, 10)) // wait for reactivity
    expect(wrapper.vm.$el.querySelector('.overgrid-dropdown-panel')?.style.display).toBe('none')
  })
})
