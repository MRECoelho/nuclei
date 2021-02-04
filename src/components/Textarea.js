import React from 'react'

import {focusAtom, blurAtom} from '../store/actions'
import TextareaAutosize from 'react-textarea-autosize'

const Textarea = (props) => {

    return (
        <TextareaAutosize 
                    name={props.name}
                    className={`textarea textarea-${props.name} ${props.completed}`}
                    value={props.value}
                    minRows={1}
                    spellCheck="false"
                    onFocus={e => props.dispatch(focusAtom(props.atomId, e.target.name))}
                    onBlur={e => props.dispatch(blurAtom(props.atomId, e.target.name))}
                    onChange={ e => props.handleChange(e, props.setContent) }
        ></TextareaAutosize>
    )
}

export default Textarea
