export const triviaReducer = (state = {}, action) => {
    if (action.type === "rate/amountChanged") {
      return { ...state, amount: action.payload };
    } else if (action.type === "rate/currencyCodeUpdated") {
      return { ...state, currencyCode: action.payload };
    } else if (action.type === "rate/updateRates") {
      return { ...state, rates: action.payload };
    }
    return state;
  }
  