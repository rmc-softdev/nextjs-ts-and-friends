
import { trivia } from '../types/trivia'
interface answer {
  id: string
  trivia: trivia
}

const initialState = {
  answers: []
}

export const types = {
  SET_TRIVIA_ANSWER: "SET_TRIVIA_ANSWER",
}

export const userFeedReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SET_TRIVIA_ANSWER:

    //find if there is an existing answer already
    const existingAnswer = state.answers.filter((answer: answer) => answer.id === payload.id)[0]
    

    if (!existingAnswer) {
      //fills the answers with a new one
    return {...state, answers: [...state.answers, {
    ...payload
    }]
    }    
  } else {
      const updatedAnswers = state.answers.map((answer: answer) => {
        if (answer.id !== payload.id) {
          return answer
        }
        return {...answer, 
          givenAnswer: payload.givenAnswer
        }
      })

    return {
      ...state, 
      answers: updatedAnswers
    }
  }
      
    default:
      return state;
  }
}
  

//sync action creators
export const setStoredAnswer = (answerInfo) => ({
  type: types.SET_TRIVIA_ANSWER,
  payload: answerInfo,
});



export const getGivenAnswers = (state) => state.userFeed