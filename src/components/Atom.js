import React from 'react'
import {focusAtom, blurAtom, editAtomTitle, editAtomNotes} from '../store/actions'
import TextareaAutosize from 'react-textarea-autosize'
import AtomControl from './AtomControl'

const Atom = props => {

    function onFocusWrapper(atomId, e) {
        props.dispatch(focusAtom(atomId, e.target.name))
    }
    
    function onBlurWrapper(atomId, e){
        props.dispatch(blurAtom(atomId, e.target.name))
    }

    return (
        <div className="atomContainer" style={{marginLeft:props.atom.indent*35 + 15/(1+props.atom.indent)}}>
            <AtomControl></AtomControl>
            <div className="atomContentContainer">
                <TextareaAutosize
                    name="title"
                    className="textarea textarea-title"
                    value={props.atom.title}
                    minRows={1}
                    spellCheck="false"
                    onFocus={e => onFocusWrapper(props.atom.id, e)}
                    onBlur={e => onBlurWrapper(props.atom.id, e)}
                    onChange={ e => props.dispatch(editAtomTitle(props.atom.id, e.target.value))}
                    
                    // ref={ref}
                ></TextareaAutosize>
                {props.atom.notes?
                <TextareaAutosize
                    name="notes"
                    className="textarea textarea-notes"
                    value={props.atom.notes}
                    minRows={1}
                    spellCheck="false"
                    onFocus={e => onFocusWrapper(props.atom.id, e)}
                    onBlur={e => onBlurWrapper(props.atom.id, e)}
                    onChange={ e => props.dispatch(editAtomNotes(props.atom.id, e.target.value))}
                    
                    // ref={ref}
                ></TextareaAutosize> :
                null
                }
            </div>
        </div>
    )
}

export default React.memo(Atom)
