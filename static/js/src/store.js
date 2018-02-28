import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import postReducer from './reducers/postReducer';
import fetchUserInfoReducer from './reducers/fetchUserInfoReducer';
import loginReducer from './reducers/loginReducer';
import registerReducer from './reducers/registerReducer';
import forgotPasswordReducer from './reducers/forgotPasswordReducer';
import sendUserEmailReducer from './reducers/sendUserEmailReducer';
import userImageReducer from './reducers/userImageReducer';
import editUserEmailReducer from './reducers/editUserEmailReducer';
import editUserNicknameReducer from './reducers/editUserNicknameReducer';


export default createStore(
    combineReducers({
    	postReducer,
        fetchUserInfoReducer,
        loginReducer,
        registerReducer,
        forgotPasswordReducer,
        sendUserEmailReducer,
        userImageReducer,
        editUserEmailReducer,
        editUserNicknameReducer,
    }),
    applyMiddleware(
        // createLogger(),
        promise()
    )
);
