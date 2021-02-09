import React, { useContext } from 'react'
import { DragAPIContext } from './DragContext';

const AtomControl = (props) => {
    const { setAllowDrag, onDragStartDraggable, setSubtreeDrag } = useContext(DragAPIContext);

    const onClickHandler = () => {
        setSubtreeDrag(old => {
            return old
        })
        onDragStartDraggable(props.atom)
    }

    return (
        <div className={`handle`} style={{ borderRadius: "8px" }}
            onMouseDown={() => { setAllowDrag(true) }}
            onDoubleClick={onClickHandler}
            onMouseUp={() => { setAllowDrag(false) }}
        >
        </div>
    )
}

export default AtomControl
