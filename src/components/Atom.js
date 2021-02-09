import React, {useCallback} from 'react'
import {editAtomContent} from '../store/actions'
import AtomControl from './AtomControl'
import Textarea from './Textarea'
import {debounce} from 'lodash'

const Atom = props => {

    const {atom} = props
    const dispatch = props.dispatch

    const debouncedEdit = useCallback( () => {
		debounce((nextValue, name, setContent) => {
            dispatch(editAtomContent(atom.id, nextValue, name, setContent))
        }, 200)
    },[dispatch, atom.id])

    const handleChange = (event, setContent) => {
        // This function handles the local state and calls the debounced action.
        // TThis enables fast front end change and low impact on expensive API calls.
        const nextValue = event.target.value
        const name = event.target.name
        setContent(nextValue)
		// Even though handleChange is created on each render and executed
        // it references the same debouncedSave that was created initially.
        // The setContent function is used as a parameter in case some 
        // API call fails and the value needs to be reset stay in sync with
        // backend data.
		debouncedEdit(nextValue, name, setContent)
    }

    const createTextAreaComponent = (name, content) => {
        const textAreaProps = { 
            name,
            content,
            atomId:atom.id,
            completed: atom.completed? "completed" :  "",
            dispatch,
            handleChange,
        }
        return(
            <Textarea
                focussed = {props.focussed}
                focussedField = {props.focussedField}
                { ...textAreaProps }
            ></Textarea>
        )
    }

    return (
        <div className={"atomContainer"} style={{marginLeft:atom.indent*35 + 20/(1+atom.indent)}}>
            {/* {console.log("render: ", atom.id)} */}
            <AtomControl atom={atom}/>
            <div className="atomContentContainer">
                {createTextAreaComponent("title", atom.title)}
                {atom.notes !== undefined ? createTextAreaComponent("notes", atom.notes ) : null}
            </div>
         </div>
    )
}


function equalityCheck(prev, next) {
    // Even though the dispatch function will not be updated in the case thast a atom
    // seems equal, the caching of that function will not interfere with the functionality of 
    // the component.
 
    return prev.atom.title === next.atom.title &&
    prev.atom.notes === next.atom.notes &&
    prev.atom.indent === next.atom.indent &&
    prev.focussed === next.focussed &&
    !(next.focussed && prev.focussedField !== next.focussedField)

  }
export default React.memo(Atom, equalityCheck)
