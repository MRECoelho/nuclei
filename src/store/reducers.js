import * as types from './types'
import * as actions from './actions'
import {useState} from 'react'

export const listReducer = (state={}, action) => {
    switch(action.type){
        case types.FETCH_DATA:
            return { ...state, loadingData: true }
        case types.FETCHING_DATA_SUCCES:
            return { ...state, 
                    listName: action.payload.listName,
                    listContent: action.payload.listContent,
                    loadingData: false }
        case types.FETCHING_DATA_FAILED:
            return { ...state, 
                    loadingData: false, 
                    errorMessage: action.payload }
        default:
            return state
    }
}
