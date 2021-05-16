import React from 'react'

import {
    Layout,
    Background
} from './components'
import { Questionnaire } from './features'

function App() {
    return (
        <Background>
            <Layout
                title="Опросник"
            >
                <Questionnaire />
            </Layout>
        </Background>
    )
}

export default App
