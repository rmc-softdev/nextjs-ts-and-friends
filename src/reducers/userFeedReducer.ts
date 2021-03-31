
const initialState = {
  answers: []
}

export const types = {
  SET_TRIVIA_ANSWER: "SET_TRIVIA_ANSWER",
}

export const userFeedReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SET_TRIVIA_ANSWER:
    //filter and update the trivia if there is one

    //this should only happen if there is no trivia answered before to prevent an ever increasing one
      return {...state, answers: [...state.answers, {
        ...payload
      }]
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