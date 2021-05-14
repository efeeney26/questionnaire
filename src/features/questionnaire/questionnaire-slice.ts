import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '../../app/axios'

// Define a type for the slice state
interface QuestionnaireState {
    questionnaireData: Array<object> | null,
    status: 'isLoading' | 'isSuccess' | 'isError'
    currentQuestionNumber: number
}

// Define the initial state using that type
const initialState: QuestionnaireState = {
    questionnaireData: null,
    status: 'isSuccess',
    currentQuestionNumber: 0
}

export const fetchQuestionnaire = createAsyncThunk('questionnaire/fetch', async () => {
    const response: { data: { results: Array<object>, response_code: number } } = await axiosInstance.get('')
    if (response?.data?.response_code === 0) {
        return response?.data?.results
    }
    throw new Error()
})

export const questionnaireSlice = createSlice({
    name: 'questionnaire',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        incrementQuestionNumber: (state) => {
            state.currentQuestionNumber += 1
        },
        decrementQuestionNumber: (state) => {
            state.currentQuestionNumber -= 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionnaire.pending, (state) => {
                state.status = 'isLoading'
            })
            .addCase(fetchQuestionnaire.fulfilled, (state, action) => {
                state.status = 'isSuccess'
                state.questionnaireData = action.payload
            })
            .addCase(fetchQuestionnaire.rejected, (state) => {
                state.status = 'isError'
            })
    }
})

export const { incrementQuestionNumber, decrementQuestionNumber } = questionnaireSlice.actions

export default questionnaireSlice.reducer