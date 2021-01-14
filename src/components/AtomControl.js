import React from 'react'
import {markSubtreeComplete, deleteAtom, addAtom, markSubtreeUncomplete, indentSubtree, unindentSubtree, hideChildren, unhideChildren} from '../store/actions'

const AtomControl = (props) => {
    return (
        <div className="handle" style={{marginTop:10, opacity:0.8, width: 12, height: 12,  background: "var(--dark-accent-300)", borderRadius:6}} >
   
    </div>
    )
}

export default AtomControl
