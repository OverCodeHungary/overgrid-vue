import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OverGridIcon from '../../components/OverGridIcon.vue'

const iconTypes = [
  'refresh',
  'filter',
  'horizontal-dots',
  'chevron-right',
  'chevron-down',
  'chevron-left',
  'chevron-up',
  'chevron-left-double',
  'chevron-right-double',
  'table',
  'cloud-download',
  'info',
  'check',
  'close',
  'edit',
  'close-circle',
  'trash',
]

describe('OverGridIcon', () => {
  it.each(iconTypes)(`renders correct SVG for type="%s"`, (type) => {
    const wrapper = mount(OverGridIcon, {
      props: { type },
    })

    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBe(1)
    expect(wrapper.html()).toContain('<svg')
  })

  it('renders nothing for unknown type', () => {
    const wrapper = mount(OverGridIcon, {
      props: { type: 'unknown-type' },
    })

    expect(wrapper.find('svg').exists()).toBe(false)
  })
})
