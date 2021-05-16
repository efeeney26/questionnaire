import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store'
import axiosInstance from '../../app/axios'

interface QuestionnaireState {
    questionnaireData: Array<{ answer: null | string }> | null,
    status: 'isPending' | 'isLoading' | 'isSuccess' | 'isError'
    currentQuestionNumber: number
}

const initialState: QuestionnaireState = {
    questionnaireData: null,
    status: 'isPending',
    currentQuestionNumber: 0
}

export const fetchQuestionnaire = createAsyncThunk('questionnaire/fetch', async (count: number) => {
    const response:
    { data: { results: Array<object>, response_code: number } } =
        await axiosInstance.get(`?amount=${count}&type=multiple`)
    if (response?.data?.response_code === 0 && response?.data?.results?.length) {
        return response.data.results.map((res) => ({
            ...res,
            answer: null
        }))
    }
    throw new Error()
})

export const questionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState,
    reducers: {
        incrementQuestionNumber: (state) => {
            state.currentQuestionNumber += 1
        },
        decrementQuestionNumber: (state) => {
            state.currentQuestionNumber -= 1
        },
        setAnswer: (state, action) => {
            if (state.questionnaireData) {
                state.questionnaireData[state.currentQuestionNumber].answer = action.payload
            }
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

export const { incrementQuestionNumber, decrementQuestionNumber, setAnswer } = questionnaireSlice.actions

export const selectCurrentQuestionnaire = createSelector(
    (state: RootState) => state.questionnaire.questionnaireData,
    (state: RootState) => state.questionnaire.currentQuestionNumber,
    (items, count) => items?.[count]
)


export default questionnaireSlice.reducer
