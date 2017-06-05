import React from 'react'
import { shallow, mount, render } from 'enzyme'

import Button from '.'

describe('A suite', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Button value={42}>Coco</Button>).contains(<button>42 :: Coco</button>)).toBe(true)
  })

  it('should be selectable by tagname "button"', () => {
    expect(shallow(<Button value={42}>Coco</Button>).is('button')).toBe(true)
  })

  it('should mount in a full DOM', () => {
    expect(mount(<Button value={42}>Coco</Button>).find('button').length).toBe(1)
  })

  it('should render to static HTML', () => {
    expect(render(<Button value={42}>Coco</Button>).text()).toEqual('42 :: Coco')
  })
})
