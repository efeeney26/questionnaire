import { configureStore } from '@reduxjs/toolkit'

// eslint-disable-next-line import/no-cycle
import questionnaireReducer from '../features/questionnaire/questionnaire-slice'

const store = configureStore({
    reducer: {
        questionnaire: questionnaireReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
