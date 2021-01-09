import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {listReducer} from './reducers'
import thunk from 'redux-thunk';

const composeEnhancer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialStoreState = {
    list:{
        listName:"",
        listContent: [],
        filteredListContent: [],
        selectedAtomIds: [],
        focussedAtomId: '',
        focussedField: '',
        loadingData: false,
        errorMessage: '',
    }
}

const rootReducer = combineReducers({
                        list: listReducer
                    })

export const store = createStore(   rootReducer, 
                                    initialStoreState, 
                                    composeEnhancer(applyMiddleware(thunk)))