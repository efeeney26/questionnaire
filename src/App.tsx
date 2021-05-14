import React from 'react'

import {
    Layout
} from './components'
import { Questionnaire } from './features'

function App() {
    return (
        <Layout
            title="Опросник"
        >
            <Questionnaire />
        </Layout>
    )
}

export default App
