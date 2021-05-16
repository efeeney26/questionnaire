import React, { FC, useCallback, useMemo, useState } from 'react'
import { shuffle } from 'lodash'

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

const setSequence = (correctAnswer: string, incorrectAnswers: Array<string>): Array<string> => {
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

    const answers: Array<string> | null = useMemo(() => {
        if (question?.incorrect_answers && question?.correct_answer) {
            return question?.type === 'multiple' ? shuffle([
                ...question?.incorrect_answers,
                question?.correct_answer
            ]) : setSequence(question.correct_answer, question.incorrect_answers)
        }
        return null
    }, [question?.incorrect_answers, question?.correct_answer, question?.type])

    const [value, setCheckbox] = useState(true)
    const [radioValue, setRadio] = useState(question?.answer || answers?.[0])

    const handleRadioChange = useCallback(({ target }) => {
        setRadio(target.value)
    }, [])

    const handleNextButtonClick = useCallback(() => {
        dispatch(setAnswer(radioValue))
        dispatch(incrementQuestionNumber())
    }, [dispatch, radioValue])

    const handleRollbackButtonClick = useCallback(() => {
        dispatch(decrementQuestionNumber())
    }, [dispatch])

    return (
        <>
            <p>{question?.question}</p>
            {answers?.length ?
                answers.map((answer) => (
                    <div
                        key={answer}
                    >
                        {question?.type === 'multiple' ?
                            <Checkbox
                                id={answer}
                                name={answer}
                                label={answer}
                                value={answer}
                                checked={value}
                                onChange={() => setCheckbox(!value)}
                                disabled={false}
                            /> :
                            <Radio
                                id={answer}
                                name={question?.question}
                                label={answer}
                                value={answer}
                                checked={radioValue === answer}
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
                Продолжить
            </Button>
        </>
    )
}

export default QuestionForm
