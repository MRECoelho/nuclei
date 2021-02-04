import React, {useState, useCallback} from 'react'
import {editAtomContent} from '../store/actions'
import AtomControl from './AtomControl'
import Textarea from './Textarea'
import {debounce} from 'lodash'


const Atom = props => {

    const {atom, dispatch} = props
    const [title, setTitle] = useState(atom.title)
    const [notes, setNotes] = useState(atom.notes)

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

    const createTextAreaComponent = (name, value, setContent) => {
        const textAreaProps = { 
            atomId:atom.id,
            completed: atom.completed? "completed" :  "",
            dispatch,
            handleChange,
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
        <div className={"atomContainer"} style={{marginLeft:atom.indent*35 + 20/(1+atom.indent)}}>
            
            {console.log("render: ", atom.id)}
            
            <AtomControl 
                atom={atom} 

            />
            
            <div className="atomContentContainer">
                {createTextAreaComponent("title", title, setTitle)}

                {atom.notes ? createTextAreaComponent("notes", notes, setNotes) : null}
                
            

            </div>
         </div>
    )
}



export default React.memo(Atom)
