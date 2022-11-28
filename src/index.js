import React,{createContext} from "react";
import ReactDOM from "react-dom/client";
import {Provider} from 'react-redux'
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
  if(action.type!=='function'){
      console.log('ACTION_TYPE = ',action.type);
  }
      next(action)
}

const store = createStore(rootReducer,applyMiddleware(logger,thunk));

// export const StoreContext = createContext();

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

const root = ReactDOM.createRoot(document.getElementById("root"));

// // const connectedComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props){
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
          
//         }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);
//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
  </React.StrictMode>
);
