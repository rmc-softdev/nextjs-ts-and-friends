export const userFeedReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case 'caso jesus':
      return {...state, triviaQuestions: payload  }
  
    default:
      return state;
  }
  }
  