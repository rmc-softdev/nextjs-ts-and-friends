import { useRouter } from "next/router";
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
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
          <li key={answer.id}> 
            <span> Your answer to the question nª: {answer.id} was {answer.givenAnswer ? <strong> True </strong> : <strong> False </strong> }</span>
            <p>Question: {answer.trivia.question}</p>         
            <p> The correct answer is {answer.correctAnswer ? 'True' : 'False'} </p>     
          </li>))}
        </ul>
        <div> 
            Ready to play again?
        </div>
        <button onClick={() => router.push('/')}> Let's go for it</button>
      </main>
    )
}

export default results
