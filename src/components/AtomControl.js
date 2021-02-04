import React, {useContext} from 'react'
// import {markSubtreeComplete, deleteAtom, addAtom, markSubtreeUncomplete, indentSubtree, unindentSubtree, hideChildren, unhideChildren} from '../store/actions'
import {DragAPIContext} from './DragContext';
// import { useDispatch,  useSelector } from 'react-redux'

const AtomControl = (props) => {
    const {setAllowDrag, onDragStartDraggable, setSubtreeDrag} = useContext(DragAPIContext);
    // const listState = useSelector(state => state.list);

    const onClickHandler = () => {
        setSubtreeDrag(old => {
            
            console.log("length: ", old.subtree.length)

            return old
        })
        onDragStartDraggable(props.atom)
    }

    return (
        <div className={`handle`}  style={{borderRadius:"8px"}}
            onMouseDown={() => {setAllowDrag(true)}}
            onDoubleClick = {onClickHandler}
            onMouseUp={() => {setAllowDrag(false)}}
        >
        </div>
    )
}

export default AtomControl
