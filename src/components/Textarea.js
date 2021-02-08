import React, {useState, useRef} from 'react'

import {focusAtom, blurAtom} from '../store/actions'
import TextareaAutosize from 'react-textarea-autosize'
import {useEffect} from 'react'

const Textarea = (props) => {
    const [content, setContent] = useState(props.content)
    let taRef = useRef(null)

    const {focussed, focussedField} = props

    
    useEffect(() => {

    if(props.name ===focussedField && focussed  ) {
        
        taRef.current.focus()
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
