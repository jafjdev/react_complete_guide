const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  counter: 0,
};

//Reducer
const rootReducer = (initialState, action) => {
  return initialState;
};
//Store
const store = createStore(rootReducer());
console.log(store.getState());

//Dispatching Action

//Subscription
