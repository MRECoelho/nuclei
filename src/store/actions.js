import * as types from './types'
import Localbase from 'localbase'

const databaseName = 'atomDB'
const atomCollection = 'atoms'
const listCollection = 'list'
const listName = 'devlist'



export const fetchData = () => async (dispatch) => {
    dispatch({type: types.FETCH_DATA})
    try{
        const db = new Localbase(databaseName)
        let list = await db.collection(listCollection).doc(listName).get()
        let listContent = await Promise.all(
            list.data.map(id => db.collection(atomCollection).doc(`${id}`).get())
            )
        dispatch ({
            type: types.FETCHING_DATA_SUCCES,
            payload: {
                listName,
                listContent
            }
        })
    } catch {
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

export const blurAtom = (focussedAtomId, focussedField) => (dispatch) => {
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



// atom types
export const hide_children = (param) => async (dispatch) => {}
export const unhide_children = (param) => async (dispatch) => {}
export const complete_subtree = (param) => async (dispatch) => {}
export const uncomplete_subtree = (param) => async (dispatch) => {}
export const complete_atom = (param) => async (dispatch) => {}
export const uncomplete_atom = (param) => async (dispatch) => {}
export const indent_subtree = (param) => async (dispatch) => {}
export const unindent_subtree = (param) => async (dispatch) => {}
// export const editAtomTitle = (atomId, title) => async (dispatch) => {

//     // TODO
//     // async call to db

//     dispatch({
//         type: types.EDIT_ATOM_TITLE,
//         payload:{
//             atomId,
//             title
//         }
//     })
// }

export const editAtomContent = (atomId, content, name, setContent) => async (dispatch) => {

    // TODO
    // async call to db
    
    setContent(content)  //use this to set the notes correctly, when db call fails
    
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



// list types
export const add_atom = (param) => async (dispatch) => {}
export const delete_atom = (param) => async (dispatch) => {}
export const move_subtree_up = (param) => async (dispatch) => {}
export const move_subtree_down = (param) => async (dispatch) => {}


// ?
export const get_list = (param) => async (dispatch) => {} 
export const get_lists = (param) => async (dispatch) => {} 
export const create_list = (param) => async (dispatch) => {} 
export const delete_list = (param) => async (dispatch) => {} 