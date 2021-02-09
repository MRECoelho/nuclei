import React, {useState, useRef} from 'react'

import {focusAtom, blurAtom} from '../store/actions'
import TextareaAutosize from 'react-textarea-autosize'
import {useEffect} from 'react'

const Textarea = (props) => {
    const [content, setContent] = useState(props.content)
    const {focussed, focussedField} = props
    let taRef = useRef(null)

    useEffect(() => {
        if(props.name ===focussedField && focussed  ) {
            // Ensure that if the focussed atom id and field is updated in the store, the visual effect
            // is applied in the DOM. That is, the followinf line synchornizes the DOM state to the
            // store state and thus ensures the right visuals for the focus functionality.
            taRef.current.focus()
            // Due to some browser differences the default behaviour would differ depending on the 
            // used browser. The following line ensures that when a atom field is focussed the cursor
            // will always be set at the end.
            taRef.current.selectionStart = taRef.current.selectionEnd = taRef.current.value.length;
        } 
    }, [focussed, taRef, props.name, focussedField])
   
    return (
        <>
        {/* {console.log("TA rerender", props.atomId)} */}
        <TextareaAutosize 
                    name={props.name}
                    className={`textarea textarea-${props.name} ${props.completed}`}
                    value={content}
                    minRows={1}
                    spellCheck="false"
                    onFocus={e =>  {props.dispatch(focusAtom(props.atomId, e.target.name))}}
                    onBlur={e => {props.dispatch(blurAtom(props.atomId, e.target.name))}}
                    onChange={ e => {e.preventDefault(); e.stopPropagation(); props.handleChange(e, setContent) }}
                    ref = {taRef}
                    ></TextareaAutosize>
        </>
    )
}



export default Textarea
