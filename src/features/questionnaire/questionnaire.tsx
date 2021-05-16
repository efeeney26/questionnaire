import React, { useCallback, useMemo, useState } from 'react'
import { groupBy } from 'lodash'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Button, Input, Spinner } from '../../components'

import { QuestionForm } from './components'
import {
    fetchQuestionnaire,
    selectCurrentQuestionnaire
} from './questionnaire-slice'

const DEFAULT_INPUT_VALUE = 3
const DIFF_MAP = {
    easy: 'Легкие',
    medium: 'Средние',
    hard: 'Сложные'
}

const Questionnaire = () => {
    const questionnaire = useAppSelector((state) => state.questionnaire)
    const currentQuestionnaire = useAppSelector(selectCurrentQuestionnaire)
    const dispatch = useAppDispatch()

    const groupedDifficultyAnswers = useMemo(() => groupBy(questionnaire.questionnaireData, 'difficulty'),
        [questionnaire.questionnaireData])

    const [inputValue, setInputValue] = useState<number>(DEFAULT_INPUT_VALUE)

    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value)
    }, [])

    const handleStartButtonClick = useCallback(() => {
        dispatch(fetchQuestionnaire(inputValue))
    }, [dispatch, inputValue])

    const handleReloadButtonClick = useCallback(() => {
        window.location.reload()
    }, [])

    return (
        <>
            {questionnaire.status === 'isPending' &&
                <div>
                    <Input
                        id="input"
                        label="Количество вопросов"
                        type="number"
                        defaultValue={DEFAULT_INPUT_VALUE}
                        placeholder="Введите значение"
                        onChange={handleInputChange}
                    />
                    <Button
                        onClick={handleStartButtonClick}
                        disabled={!inputValue}
                    >
                        Начать
                    </Button>
                </div>
            }
            {questionnaire.status === 'isLoading' &&
                <Spinner />
            }
            {questionnaire.status === 'isSuccess' &&
            questionnaire.currentQuestionNumber !== questionnaire.questionnaireData?.length &&
                <div>
                    <h3>
                        {/* eslint-disable-next-line max-len */}
                        {`Вопрос ${questionnaire.currentQuestionNumber + 1} из ${questionnaire.questionnaireData?.length}`}
                    </h3>
                    <QuestionForm
                        question={currentQuestionnaire}
                        questionNumber={questionnaire?.currentQuestionNumber}
                    />
                </div>
            }
            {questionnaire.status === 'isError' &&
                <p>Упс, что-то пошло не так</p>
            }
            {questionnaire.currentQuestionNumber === questionnaire.questionnaireData?.length &&
                <>
                    <h1>Молодцом</h1>
                    <p>
                        {`Всего вопросов - ${questionnaire.questionnaireData?.length}`}
                    </p>
                    {Object.entries(groupedDifficultyAnswers).map((item) => {
                        const itemsWithCorrectAnswers = item[1].filter((iwca) => {
                            if (typeof iwca.answer === 'string') {
                                // @ts-ignore
                                return iwca.answer === iwca.correct_answer
                            }
                            // @ts-ignore
                            return iwca?.answer.includes(iwca.correct_answer)
                        })
                        return (
                            <div
                                key={item[0]}
                            >
                                {/* @ts-ignore*/}
                                <h3>{DIFF_MAP[item[0]]}</h3>
                                <p>{`Кол-во вопросов - ${item[1].length}`}</p>
                                <p>{`Кол-во правильных ответов - ${itemsWithCorrectAnswers.length}`}</p>
                            </div>
                        )
                    })}
                    <Button
                        onClick={handleReloadButtonClick}
                    >
                        Попробовать еще раз!
                    </Button>
                </>
            }
        </>
    )
}

export default Questionnaire
