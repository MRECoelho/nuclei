import React from 'react'
import {markSubtreeComplete, deleteAtom, addAtom, markSubtreeUncomplete, indentSubtree, unindentSubtree, hideChildren, unhideChildren} from '../store/actions'

const AtomControl = (props) => {
    return (
        <div className="handle" style={{marginTop:12, opacity:0.8, width: 10, height: 10,  background: "var(--dark-accent-300)", borderRadius:5}} >
   
    </div>
    )
}

export default AtomControl
