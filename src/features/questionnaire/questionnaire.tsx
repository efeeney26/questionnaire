import React, { useCallback } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { incrementQuestionNumber, fetchQuestionnaire } from './questionnaire-slice'

const Questionnaire = () => {
    const currentQuestion = useAppSelector((state) => state.questionnaire.currentQuestionNumber)
    const dispatch = useAppDispatch()

    const handleIncClick = useCallback((): void => {
        dispatch(incrementQuestionNumber())
    }, [])

    const handleTestClick = useCallback(() => {
        dispatch(fetchQuestionnaire())
    }, [])

    return (
        <div>
            {`Hello ${currentQuestion}`}
            <button
                type="button"
                aria-label="Increment value"
                onClick={handleIncClick}
            >
                +
            </button>
            <button
                type="button"
                aria-label="Increment value"
                onClick={handleTestClick}
            >
                test
            </button>
        </div>
    )
}

export default Questionnaire
