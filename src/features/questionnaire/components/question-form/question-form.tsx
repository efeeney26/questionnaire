import React, { FC, useMemo } from 'react'
import { shuffle } from 'lodash'

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
                    <p
                        key={answer}
                    >
                        {answer}
                    </p>
                )) : null
            }
        </>
    )
}

export default QuestionForm
