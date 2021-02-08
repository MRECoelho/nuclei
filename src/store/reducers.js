import * as types from './types'

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

        case types.TOGGLE_ATOM_COMPLETE:
            return { ...state, listContent: state.listContent.map(atom => {
                if (atom.id=== action.payload){
                        let completed = atom.completed? false : true 
                    return {...atom, completed: completed}
                }else{
                    return atom
                }
            })}

        case types.MARK_SUBTREE_COMPLETE:
            return { ...state, listContent: state.listContent.map((atom, index) => {
                if(index >= action.payload.startIndex && index <= action.payload.stopIndex){
                    return { ...atom, completed: true}
                } else{
                    return { ...atom }
                }
            })}

        case types.MARK_SUBTREE_UNCOMPLETE:
            return { ...state, listContent: state.listContent.map((atom, index) => {
                if(index >= action.payload.startIndex && index <= action.payload.stopIndex){
                    return { ...atom, completed: false}
                } else{
                    return { ...atom }
                }
            })}

        case types.INDENT_SUBTREE:
            return { ...state, listContent: state.listContent.map((atom, index) => {
                if(index >= action.payload.startIndex && index <= action.payload.stopIndex){
                    return { ...atom, indent: atom.indent + 1}
                } else{
                    return { ...atom }
                }
            })}

        case types.UNINDENT_SUBTREE:
            return { ...state, listContent: state.listContent.map((atom, index) => {
                if(index >= action.payload.startIndex && index <= action.payload.stopIndex){
                    return { ...atom, indent: atom.indent - 1}
                } else{
                    return { ...atom }
                }
            })}

        case types.MARK_CHILDREN_HIDDEN:
            return { ...state, listContent: state.listContent.map((atom, index) => {
                if(index >= action.payload.startIndex && index <= action.payload.stopIndex){
                    return { ...atom, hidden: true}
                } else{
                    return { ...atom }
                }
            })}

        case types.MARK_CHILDREN_VISIBLE:
            return { ...state, listContent: state.listContent.map((atom, index) => {
                if(index >= action.payload.startIndex && index <= action.payload.stopIndex){
                    return { ...atom, hidden: false}
                } else{
                    return { ...atom }
                }
            })}

        case types.ADD_ATOM:
            let slice = state.listContent.slice()
            action.payload.index >= state.listContent.length ? 
                slice.push(action.payload.newAtom) :
                slice.splice(action.payload.index, 0, action.payload.newAtom)
            return { ...state, listContent: slice}

        case types.DELETE_ATOM:
            return { ...state, listContent: state.listContent.filter(atom => atom.id !== action.payload)}
        
        case types.DELETE_SUBTREE:
            return { ...state, listContent: state.listContent.filter(atom => {
                    return !action.payload.includes(atom.id)
                

                // if (!action.payload || atom.id !== action.payload[0]){
                //     return atom
                // } else {
                //     action.payload.shift()
                // }
            })}
        case types.DELETE_NOTES:
            return { ...state, listContent: state.listContent.map(atom => atom.id === action.payload? delete atom.notes && atom : atom  )}
        case types.NO_EMPTY_LIST:
            let newlistconent = []
            newlistconent.push(action.payload)
            return { ...state, listContent: newlistconent}

        case types.REORDER_LIST:
            return { ...state, listContent: action.payload}

        default:
            return state
    }

    
    

}
