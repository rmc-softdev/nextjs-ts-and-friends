import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { triviaReducer } from "../reducers/triviaReducer";
import { userFeedReducer } from "../reducers/userFeedReducer";

const rootReducer = combineReducers({
  trivia: triviaReducer,
  userFeed: userFeedReducer,
});

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
      );
    
      
export const store = createStore(rootReducer, enhancer);
