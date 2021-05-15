import React, { FC, useMemo, useState } from 'react'
import { shuffle } from 'lodash'

import { Checkbox, Radio } from '../../../../components'

type OnChangeType = {
    target: {
        value: string
    }
}

interface IQuestionFormProps {
    question?: {
        category?: string,
        correct_answer?: string,
        difficulty?: string,
        question?: string,
        incorrect_answers?: Array<string>,
        type?: 'multiple' | string
    }
}

const QuestionForm: FC<IQuestionFormProps> = ({ question }) => {
    const [value, setCheckbox] = useState(true)
    const [radioValue, setRadio] = useState(true)

    const answers: Array<string> | null = useMemo(() => {
        if (question?.incorrect_answers && question?.correct_answer) {
            return shuffle([
                ...question?.incorrect_answers,
                question?.correct_answer
            ])
        }
        return null
    }, [question?.incorrect_answers, question?.correct_answer])

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
                                checked={radioValue}
                                onChange={({ target } : OnChangeType) => {
                                    setRadio(Boolean(target.value))
                                }}
                                disabled={false}
                            />
                        }
                    </div>
                )) : null
            }
        </>
    )
}

export default QuestionForm
