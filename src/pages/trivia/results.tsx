import React from 'react'
import { useSelector } from 'react-redux'
import { getGivenAnswers } from '../../reducers/userFeedReducer'

const results = () => {

    const { answers } = useSelector(getGivenAnswers)
    return (
        <>
        <p> Are you ready to submit your answer? </p>
        <p> These are you answers</p>
        <ul>
          {answers.map((answer) => (
          <li key={answer.id}> 
            <span> Your answer to the question nª: {answer.id} was {answer.givenAnswer ? <strong> True </strong> : <strong> False </strong> }</span>
            <p>Question: {answer.trivia.question}</p>              
          </li>))}
        </ul>
      </>
    )
}

export default results
