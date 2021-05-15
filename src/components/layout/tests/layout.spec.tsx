import React from 'react'
import { shallow } from 'enzyme'

import Layout from '../layout'

describe('Layout', () => {
    it('should render properly with title and children', () => {
        const button = shallow(<Layout title="title">kek</Layout>)
        expect(button).toMatchSnapshot()
    })
})
