import React, { useCallback, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Button, Input, Spinner } from '../../components'

import { QuestionForm } from './components'
import {
    fetchQuestionnaire,
    selectCurrentQuestionnaire
} from './questionnaire-slice'

const DEFAULT_INPUT_VALUE = 3

const Questionnaire = () => {
    const questionnaire = useAppSelector((state) => state.questionnaire)
    const currentQuestionnaire = useAppSelector(selectCurrentQuestionnaire)
    const dispatch = useAppDispatch()

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
            {questionnaire?.status === 'isLoading' &&
                <Spinner />
            }
            {questionnaire.status === 'isSuccess' &&
            questionnaire?.currentQuestionNumber !== questionnaire?.questionnaireData?.length &&
                <div>
                    <h3>
                        {/* eslint-disable-next-line max-len */}
                        {`Вопрос ${questionnaire?.currentQuestionNumber + 1} из ${questionnaire?.questionnaireData?.length}`}
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
            {questionnaire?.currentQuestionNumber === questionnaire?.questionnaireData?.length &&
                <>
                    <h1>Молодцом</h1>
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
