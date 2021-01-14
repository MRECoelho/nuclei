import React, {useState, useCallback} from 'react'
import {editAtomContent} from '../store/actions'
// import TextareaAutosize from 'react-textarea-autosize'
import AtomControl from './AtomControl'
import Textarea from './Textarea'
import {debounce} from 'lodash'

const Atom = props => {
    // impl local State for title and Notes
    const [title, setTitle] = useState(props.atom.title)
    const [notes, setNotes] = useState(props.atom.notes)

    const debouncedEdit = useCallback(
		debounce((nextValue, name, setContent) => {
            props.dispatch(editAtomContent(props.atom.id, nextValue, name, setContent))
        }, 200),
		[], 
	)

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

    const createTextAreaComponent = (name, value, setContent) => {
        const textAreaProps = { 
            dispatch:props.dispatch,
            atomId:props.atom.id,
            handleChange:handleChange,
            completed: props.atom.completed? "completed" :  ""
        }
        return(
            <Textarea
                    name={name}
                    value={value}
                    setContent={setContent}
                    { ...textAreaProps }
            ></Textarea>
        )
    }

    return (
        <div className={"atomContainer"} style={{marginLeft:props.atom.indent*35 + 15/(1+props.atom.indent)}}>
            <AtomControl atomId={props.atom.id} dispatch={props.dispatch}  />
            
            <div className="atomContentContainer">
                {createTextAreaComponent("title", title, setTitle)}

                {props.atom.notes ? createTextAreaComponent("notes", notes, setNotes) : null}
            </div>
         </div>
    )
}



export default React.memo(Atom)
