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
        case types.FOCUS_ATOM:
            return { ...state,
                    focussedAtomId: action.payload.focussedAtomId,
                    focussedField: action.payload.focussedField }
        case types.BLUR_ATOM:
            if (state.focussedAtomId === action.payload.focussedAtomId &&
                state.focussedField === action.payload.focussedField){
                // in case that another focus action is dispatched before
                // this blur action, it's nessecary to check that the right
                // atom is blurred
                return { ...state,
                    focussedAtomId: "",
                    focussedField: "" }
            } else {
                // the case when focus action is dispatched before a blur action
                // no action needed, focus action has overwritten the old state
                return { ...state }
            }
        case types.EDIT_ATOM_TITLE:
            let editedTitle = state.listContent.map(atom => {
                                    if (atom.id === action.payload.atomId){    
                                        return { ...atom, title: action.payload.title}
                                    } else {
                                        return atom
                                    }
            })  
            return{ ...state,
                listContent: editedTitle
            }
        case types.EDIT_ATOM_NOTES:
            console.log("super expensive executed")
            let editedNotes = state.listContent.map(atom => {
                                    if (atom.id === action.payload.atomId){    
                                        return { ...atom, notes: action.payload.notes}
                                    } else {
                                        return atom
                                    }
            })  
            return{ ...state,
                listContent: editedNotes
            }
        default:
            return state
    }
}
