import { handleFetchTrivia } from './../api/api';
import { triviaQuestions } from '../types/trivia'


const initialState: {
  triviaQuestions: triviaQuestions
} = {
  triviaQuestions: {
    loading: false,
    error: false,
    questions: undefined
  }
}

export const types = {
  GET_TRIVIA_QUESTIONS: "GET_TRIVIA_QUESTIONS",
  LOADING_TRIVIA_QUESTIONS: "LOADING_TRIVIA_QUESTIONS",
  ERROR_TRIVIA_QUESTIONS: "ERROR_TRIVIA_QUESTIONS"
}

export const triviaReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.GET_TRIVIA_QUESTIONS:
      return {...state, triviaQuestions: {
        ...state.triviaQuestions,
        questions: payload
      } }
      case types.LOADING_TRIVIA_QUESTIONS:
      return {...state, triviaQuestions: {
        ...state.triviaQuestions,
        loading: payload
      } }
      case types.ERROR_TRIVIA_QUESTIONS:
        return {...state, triviaQuestions: {
          ...state.triviaQuestions,
          error: payload
        } }
  
    default:
      return state;
  }
}
  
//async action creators
export function getQuestions() {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: types.LOADING_TRIVIA_QUESTIONS, payload: true});

    try {     
      const data = await handleFetchTrivia()

      dispatch({ type: types.GET_TRIVIA_QUESTIONS, payload: data});
      
      dispatch({ type: types.LOADING_TRIVIA_QUESTIONS, payload: false});
      //this error handling is not every efficient, we'd implement one alongside the backend in the proper response mechanism
      //I'll leave it here as a raw example
    } catch (error) {
      dispatch({ type: types.ERROR_TRIVIA_QUESTIONS, payload: error});

      dispatch({ type: types.LOADING_TRIVIA_QUESTIONS, payload: false});
    }
  };
}

//sync action creators
export const example = (somethingtoadd) => ({
  type: 'type example',
  payload: somethingtoadd,
});



export const getCurrentQuestions = (state) => state.trivia;