import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { useAppDispatch } from '../../../../app/hooks'
import { Checkbox, Radio, Button } from '../../../../components'
import { decrementQuestionNumber, incrementQuestionNumber, setAnswer } from '../../questionnaire-slice'

interface IQuestionFormProps {
    question?: {
        category?: string,
        correct_answer?: string,
        difficulty?: string,
        question?: string,
        incorrect_answers?: Array<string>,
        type?: 'multiple' | 'boolean',
        answer: any
    },
    questionNumber: number
}

interface ICheckboxState {
    [x: string]: any
}

const setAnswersSequence = (correctAnswer: string, incorrectAnswers: Array<string>): Array<string> => {
    if (correctAnswer === 'True') {
        return [
            correctAnswer,
            ...incorrectAnswers
        ]
    }
    return [
        ...incorrectAnswers,
        correctAnswer
    ]
}

const QuestionForm: FC<IQuestionFormProps> = ({ question, questionNumber }) => {
    const dispatch = useAppDispatch()

    const answerOptions: Array<string> | null = useMemo(() => {
        if (question?.incorrect_answers && question?.correct_answer) {
            return question?.type === 'multiple' ? [
                ...question?.incorrect_answers,
                question?.correct_answer
            ] : setAnswersSequence(question.correct_answer, question.incorrect_answers)
        }
        return null
    }, [question?.incorrect_answers, question?.correct_answer, question?.type])

    const checkedItems = useMemo(() => answerOptions && answerOptions.reduce((acc, answer) => ({
        ...acc,
        [answer]: question?.answer ? question?.answer.includes(answer) : false
    }), {}), [answerOptions, question?.answer])

    const [checkboxState, setCheckboxState] = useState<ICheckboxState | null>(checkedItems)
    const [radioValue, setRadio] = useState(question?.answer || answerOptions?.[0])

    const selectedAnswerOptions = useMemo(() => checkboxState && Object
        .keys(checkboxState)
        .filter((key) => checkboxState[key]),
    [checkboxState])

    useEffect(() => {
        setCheckboxState(checkedItems)
    }, [checkedItems])

    const handleCheckboxChange = useCallback(({ target }) => {
        setCheckboxState((state) => ({
            ...state,
            [target.name]: target.checked
        }))
    }, [])

    const handleRadioChange = useCallback(({ target }) => {
        setRadio(target.value)
    }, [])

    const handleNextButtonClick = useCallback(() => {
        const answer = question?.type === 'multiple' ? selectedAnswerOptions : radioValue
        dispatch(setAnswer(answer))
        dispatch(incrementQuestionNumber())
    }, [dispatch, question?.type, radioValue, selectedAnswerOptions])

    const handleRollbackButtonClick = useCallback(() => {
        dispatch(decrementQuestionNumber())
    }, [dispatch])

    return (
        <>
            <p>{question?.question}</p>
            {answerOptions?.length ?
                answerOptions.map((answerOption) => (
                    <div
                        key={answerOption}
                    >
                        {question?.type === 'multiple' ?
                            <Checkbox
                                id={answerOption}
                                name={answerOption}
                                label={answerOption}
                                checked={checkboxState?.[answerOption]}
                                onChange={handleCheckboxChange}
                                value={answerOption}
                            /> :
                            <Radio
                                id={answerOption}
                                name={question?.question}
                                label={answerOption}
                                value={answerOption}
                                checked={radioValue === answerOption}
                                onChange={handleRadioChange}
                            />
                        }
                    </div>
                )) : null
            }
            <Button
                disabled={questionNumber === 0}
                onClick={handleRollbackButtonClick}
            >
                Назад
            </Button>
            <Button
                onClick={handleNextButtonClick}
            >
                Ответить
            </Button>
        </>
    )
}

export default QuestionForm
