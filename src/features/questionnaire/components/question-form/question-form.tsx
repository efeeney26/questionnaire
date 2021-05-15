import React, { FC, useMemo, useState } from 'react'
import { shuffle } from 'lodash'

import { Checkbox } from '../../../../components'

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
                        <Checkbox
                            id={answer}
                            name={answer}
                            label={answer}
                            checked={value}
                            onChange={() => setCheckbox(!value)}
                            disabled={false}
                        />
                    </div>
                )) : null
            }
        </>
    )
}

export default QuestionForm
