import { useRouter } from "next/router";
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import QuestionCard from "../../components/QuestionCard";
import { getGivenAnswers } from '../../reducers/userFeedReducer'

const results = () => {
    const router = useRouter()

    const { answers } = useSelector(getGivenAnswers)

    const calculateScore = (answers) => {
        let score = 0;

        answers.forEach(answer => {
            if (answer.correctAnswer === answer.givenAnswer) {
                score++
            }
        })
    
        return `${score}/${answers.length}`
    }

   useEffect(() => {
    if (answers.length === 0) {
        router.push('/')
    }
   }, [])

    return (
        <main className='main'>
        <p> Your total score was {calculateScore(answers)} </p>
        <p> These are the results</p>
        <ul>
          {answers.map((answer) => (
              <QuestionCard answer={answer} />
         
         ))}
        </ul>
        <div> 
            Ready to play again?
        </div>
        <button onClick={() => router.push('/')}> Let's go for it</button>
      </main>
    )
}

export default results
