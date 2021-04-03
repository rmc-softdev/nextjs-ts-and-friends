import React from 'react'

const QuestionCard = ({answer}) => {
    return (
        <li key={answer.id}> 
        <span> Your answer to the question nª: {answer.id} was {answer.givenAnswer ? <strong> True </strong> : <strong> False </strong> }</span>
        <p>Question: {answer.trivia.question}</p>         
        <p> The correct answer is {answer.correctAnswer ? 'True' : 'False'} </p>     
      </li>
    )
}

export default QuestionCard
