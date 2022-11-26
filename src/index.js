import React from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import "./styles/index.css";
import App from "./components/App";
import rootReducer from "./reducers";


// const logger = function({dispatch,getState}){
//       return function(next){
//         return function(action){
//           console.log('ACTION_TYPE = ',action.type);
//           next(action)
//         }
//       }
// }

// const thunk = store => next => action => {
//   if (typeof action === 'function') {
//     return action(store.dispatch);
//   }

//   next(action);
// };


const logger = ({dispatch,getState})=> (next)=> (action)=>{
  // if(action.type!='function'){
  //     console.log('ACTION_TYPE = ',action.type);
  // }
      next(action)
}
const store = createStore(rootReducer,applyMiddleware(logger,thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
