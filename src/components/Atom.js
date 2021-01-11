import React, {useState, useCallback} from 'react'
import {focusAtom, blurAtom, editAtomTitle, editAtomContent} from '../store/actions'
import TextareaAutosize from 'react-textarea-autosize'
import AtomControl from './AtomControl'
import {debounce} from 'lodash'

const Atom = props => {

    // impl local State for title and Notes
    const [title, setTitle] = useState(props.atom.title)
    const [notes, setNotes] = useState(props.atom.notes)

    // const editTitleWrapper = (atomId, e) => {

    //     // update local state
    //     // call debounce fn

    //     props.dispatch(editAtomTitle(atomId, e.target.value))
    // }


    // const editNotesWrapper = (atomId, e) => {

    //     // update local state
    //     // call debounce fn

    //     props.dispatch(editAtomContent(atomId, e.target.value))
    // }

    const debouncedEdit = useCallback(
		debounce((nextValue, name, fn) => {
            // console.log(setNotes)
            props.dispatch(editAtomContent(props.atom.id, nextValue, name, fn))
            // saveToDb(nextValue)
        }, 500),
		[], // will be created only once initially
	);

    const handleChange = (event, fn) => {
        const nextValue = event.target.value
        const name = event.target.name
        console.log("fn ==> ", event.target.name)
        // console.log("sn ==> ", setNotes)
		fn(nextValue)
		// Even though handleChange is created on each render and executed
		// it references the same debouncedSave that was created initially
		debouncedEdit(nextValue, name, fn)
	}

    return (
        <div className="atomContainer" style={{marginLeft:props.atom.indent*35 + 15/(1+props.atom.indent)}}>
            <AtomControl></AtomControl>
            <div className="atomContentContainer">
                <TextareaAutosize
                    name="title"
                    className="textarea textarea-title"
                    value={title}
                    minRows={1}
                    spellCheck="false"
                    onFocus={e =>  props.dispatch(focusAtom(props.atom.id, e.target.name))}
                    onBlur={e => props.dispatch(blurAtom(props.atom.id, e.target.name))}
                    onChange={ e => handleChange(e, setTitle) }
                    
                    // ref={ref}
                ></TextareaAutosize>
                {props.atom.notes?
                <TextareaAutosize
                    name="notes"
                    className="textarea textarea-notes"
                    value={notes}
                    minRows={1}
                    spellCheck="false"
                    onFocus={e =>  props.dispatch(focusAtom(props.atom.id, e.target.name))}
                    onBlur={e => props.dispatch(blurAtom(props.atom.id, e.target.name))}
                    onChange={ e => handleChange(e, setNotes) }
                    
                    // ref={ref}
                ></TextareaAutosize> :
                null
                }
            </div>
        </div>
    )
}

export default React.memo(Atom)
