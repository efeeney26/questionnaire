import React, { useCallback, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Button, Input, Spinner } from '../../components'

import { incrementQuestionNumber, fetchQuestionnaire } from './questionnaire-slice'


const Questionnaire = () => {
    const questionnaire = useAppSelector((state) => state.questionnaire)
    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<number>(3)

    const handleIncClick = useCallback(() => {
        dispatch(incrementQuestionNumber())
    }, [dispatch])

    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value)
    }, [])

    const handleStartButtonClick = useCallback(() => {
        dispatch(fetchQuestionnaire(inputValue))
    }, [dispatch, inputValue])

    return (
        <>
            {questionnaire.status === 'isPending' &&
                <div>
                    <Input
                        type="number"
                        defaultValue={3}
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
                <div>
                    Hello
                </div>
            }
            {questionnaire.status === 'isError' &&
                <p>Упс, что-то пошло не так</p>
            }
        </>
    )
}

export default Questionnaire
