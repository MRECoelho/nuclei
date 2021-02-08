import * as types from './types'
import Localbase from 'localbase'
import { v4 as uuidv4 } from "uuid";
import {getSubTree, tryIndent, tryUnindent, newAtom, createAtom, getNextAtom, getPreviousAtom} from '../helperFunctions'

const databaseName = 'atomDB'
const atomCollection = 'atoms'
const listCollection = 'list'
const listName = 'devlist'

export const fetchData = () => async (dispatch) => {
    dispatch({type: types.FETCH_DATA})
    try{
        const db = new Localbase(databaseName)
        let list = await db.collection(listCollection).doc(listName).get()
        // let newlist = list.data
        // async function fillfunc () {
        //     // let arr =[]
        //     // arr.push([...listContent])
        //     for (let index = 0; index < 100; index++) {
        //         let newId = uuidv4()
        //         let newAtom = {title: "filler",
        //         notes: "",
        //         indent: 1,
        //         hidden: false,
        //     }
        //     await db.collection(atomCollection).add(newAtom, newId)
        //     newlist.push(newId)
        // }
        //     await db.collection(listCollection).doc(listName).set({data:newlist})
        // }
        // let x = await fillfunc()
        let listContent = await Promise.all(
            list.data.map(async id => {
                return db.collection(atomCollection).doc(`${id}`).get()
                // let atom = await db.collection(atomCollection).doc(`${id}`).get()
                // await db.collection(atomCollection).doc(`${id}`).update({id})
                // return atom
            }
            ))
        dispatch ({
            type: types.FETCHING_DATA_SUCCES,
            payload: {
                listName,
                listContent: listContent.slice(0,100)
            }
        })
    } catch {
        console.log("error")
        dispatch ({
            type: types.FETCHING_DATA_FAILED,
            payload: "error message"
        })
    }
}

export const focusAtom = (focussedAtomId, focussedField) => (dispatch) => {
    dispatch(
        {
            type: types.FOCUS_ATOM,
            payload: {
                focussedAtomId,
                focussedField
            }
        }
        )
}

export const blurAtom = (focussedAtomId, focussedField) => (dispatch, getState) => {
    if( focussedAtomId === getState().list.focussedAtomId &&
        focussedField === getState().list.focussedField ){
            dispatch(
                {
                    type: types.BLUR_ATOM,
                    payload: {
                        focussedAtomId,
                        focussedField
                    }
                }
            )
        }
}



// atom types
export const hideChildren = (atomId) => async (dispatch, getState) => {
    const atomId = getState().list.focussedAtomId
    let {startIndex, stopIndex} = getSubTree(getState().list.listContent, atomId)
    startIndex = startIndex + 1 
    // optimize by checking is same?
    dispatch({
        type: types.MARK_CHILDREN_HIDDEN,
        payload: {
            startIndex,
            stopIndex
        }
    })
}

export const unhideChildren = (atomId) => async (dispatch, getState) => {
    const atomId = getState().list.focussedAtomId
    let {startIndex, stopIndex} = getSubTree(getState().list.listContent, atomId)
    startIndex = startIndex + 1
    // optimize by checking is same?
    dispatch({
        type: types.MARK_CHILDREN_VISIBLE,
        payload: {
            startIndex,
            stopIndex
        }
    })
}

export const markSubtreeComplete = (atomId) => async (dispatch, getState) => {
    let {startIndex, stopIndex} = getSubTree(getState().list.listContent, atomId)
    dispatch({
        type: types.MARK_SUBTREE_COMPLETE,
        payload: {
            startIndex,
            stopIndex
        }
    })

}

export const markSubtreeUncomplete = (atomId) => async (dispatch, getState) => {
    let {startIndex, stopIndex} = getSubTree(getState().list.listContent, atomId)
    dispatch({
        type: types.MARK_SUBTREE_UNCOMPLETE,
        payload: {
            startIndex,
            stopIndex
        }
    })
}

export const toggleAtomComplete = (atomId) => async (dispatch) => {

    // async call

    dispatch({
        type: types.TOGGLE_ATOM_COMPLETE,
        payload: atomId
    })
}

export const uncomplete_atom = (param) => async (dispatch) => {}

export const indentSubtree = () => async (dispatch, getState) => {
    const focussedAtomId = getState().list.focussedAtomId
    if (focussedAtomId !==""){
        let {canIndent, payload} = tryIndent(getState().list.listContent, focussedAtomId)
        if(canIndent){
            dispatch({
                type: types.INDENT_SUBTREE,
                payload
            }) 
        }      
    }
}

export const unindentSubtree = () => async (dispatch, getState) => {
    const focussedAtomId  = getState().list.focussedAtomId
    let {canUnindent, payload} = tryUnindent(getState().list.listContent, focussedAtomId)
    if(canUnindent){
        dispatch({
            type: types.UNINDENT_SUBTREE,
            payload
        }) 
    }
}

export const editAtomContent = (atomId, content, name, setContent) => async (dispatch) => {
    // write comments / doc string?
    // conent = 
    // name = 
    // setContent = 
    // TODO
    // async call to db
    
    // setContent(content)  //use this to set the notes correctly, when db call fails
    if (name === "title"){
        dispatch({
            type: types.EDIT_ATOM_TITLE,
            payload:{
                atomId,
                title: content
            }
        })
    } else if (name === "notes"){
        dispatch({
            type: types.EDIT_ATOM_NOTES,
            payload:{
                atomId,
                notes: content
            }
        })
    } else {
        // throw err
    }
}


export const toNextAtom = () => async (dispatch, getState) => {
    const {focussedAtomId, listContent}  = getState().list

    const result = getNextAtom(focussedAtomId, listContent)

    if (result.nextExists) {
        // dispatch(blurAtom(focussedAtomId, "title"))
        dispatch(focusAtom(result.payload, "title"))
    }
    
    // dispatch({
    //     type: types.ADD_ATOM,
    //     payload: result
    // })
}
export const toPrevAtom = () => async (dispatch, getState) => {
    const {focussedAtomId, focussedField,listContent}  = getState().list
    if(focussedField==="notes"){
            dispatch(focusAtom(focussedAtomId, "title"))
    } else {
        const result = getPreviousAtom(focussedAtomId, listContent)
        if (result.prevExists) {
            // dispatch(blurAtom(focussedAtomId, "title"))
            
            dispatch(focusAtom(result.payload, "title"))
        }

    }


    
    // dispatch({
    //     type: types.ADD_ATOM,
    //     payload: result
    // })
}

export const toNotes = () => async (dispatch, getState) => {
    const {focussedAtomId, listContent}  = getState().list
    const atom = listContent.find(x => x.id === focussedAtomId)


    if(atom.notes){
        dispatch({
            type: types.EDIT_ATOM_NOTES,
            payload:{
                atomId: focussedAtomId,
                notes: "replaced"
            }
        })
        
        dispatch(focusAtom(focussedAtomId, "notes"))



    } else {
        dispatch({
            type: types.EDIT_ATOM_NOTES,
            payload:{
                atomId: focussedAtomId,
                notes: ""
            }
        })
        dispatch(focusAtom(focussedAtomId, "notes"))
        
    }

}

export const deleteActions = (force=false) => async (dispatch, getState) => {
    const {focussedAtomId, focussedField} = getState().list

    if( focussedField === "notes"){
        dispatch(deleteNotes(focussedAtomId))
    } else {
        const {listContent} = getState().list
        const atom  = listContent.find(atom => atom.id === focussedField)
        if (force || !atom.notes){
            dispatch(deleteAtom(focussedAtomId, force))
            // 
        }

    }
}


export const deleteNotes = (focussedAtomId) => async (dispatch, getState) => {
        dispatch({
            type: types.DELETE_NOTES,
            payload: focussedAtomId,
        })
        dispatch(focusAtom(focussedAtomId, "title"))

        refocus()
}

const refocus = () => {
    // Hacky solution for persistent bug in react-hotkeys library. 
    // Library will be replaced with own implementation in the future.
    const oldActiveElement = document.activeElement;
    document.activeElement.blur();
    setTimeout(() => {
    oldActiveElement.focus();
    }, 100);
}

// list types
export const addAtom = (newAtomParams) => async (dispatch, getState) => {
    const focussedAtomId = getState().list.focussedAtomId
    const id = uuidv4()
    const result = newAtom(getState().list.listContent, focussedAtomId, {...newAtomParams, id})
    dispatch({
        type: types.ADD_ATOM,
        payload: result
    })

    dispatch(focusAtom(id, "title"))
}

export const noEmptyList = (newAtomParams) => async (dispatch) => {
    const id = uuidv4()
    const newAtom = createAtom({...newAtomParams, id})  
    dispatch({
        type: types.NO_EMPTY_LIST,
        payload: newAtom
    })
}

export const deleteAtom = (atomId, force = false) => async (dispatch, getState) => {
    let {subtree} = getSubTree(getState().list.listContent, atomId)
    // what to do if atom is only root atom?    
    const hasChildren = subtree.length === 1 ? false : true
    const onlyRootAtom = subtree.length === getState().list.listContent.length
    if (!hasChildren){
        dispatch({
            type: types.DELETE_ATOM,
            payload: subtree[0].id
        })
    } else if (hasChildren && force) {
        dispatch({
            type: types.DELETE_SUBTREE,
            payload: subtree.map(atom => atom.id)
        })
    }
    if(onlyRootAtom){
        dispatch(noEmptyList())
    }
}



export const move_subtree_up = (param) => async (dispatch) => {}
export const move_subtree_down = (param) => async (dispatch) => {}


export const get_list = (param) => async (dispatch) => {} 
export const get_lists = (param) => async (dispatch) => {} 
export const create_list = (param) => async (dispatch) => {} 
export const delete_list = (param) => async (dispatch) => {} 


// export const reorderList = (list) => async (dispatch) => {
//     dispatch({
//         type: types.REORDER_LIST,
//         payload: list
//     })
// }