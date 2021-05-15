import React from 'react'
import { shallow } from 'enzyme'

import Button from '../button'

describe('Button', () => {
    it('should render properly', () => {
        const button = shallow(<Button disabled />)
        expect(button).toMatchSnapshot()
    })
})
