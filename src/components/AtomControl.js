import React from 'react'
import {markSubtreeComplete, deleteAtom, addAtom, markSubtreeUncomplete, indentSubtree, unindentSubtree, hideChildren, unhideChildren} from '../store/actions'

const AtomControl = (props) => {
    return (
        <div className="handle" style={{marginTop:8, opacity:0.8, width: 15, height: 15,  background: "var(--dark-accent-300)", borderRadius:8}} >
   
    </div>
    )
}

export default AtomControl
