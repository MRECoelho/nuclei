import React, {useContext} from 'react'
import {DragAPIContext} from './DragContext';
import * as dndviz from '../dragAndDropVisuals'

const Draggable = props => {

	const {atom, children} = props

	const context = useContext(DragAPIContext);
	
	let draggableRef = null
    
    return (
		<>
			<div className={`listRow ${
				dndviz.applyDragTreeVisuals(context.subtreeDrag.subtree, atom.id)}`}
				ref={ ref => draggableRef = ref }
				style={{display: atom.hidden? `none` : ''}}
				draggable={context.allowDrag}
				onMouseDown={e => (context.allowDrag&&context.onDragStartDraggable(atom))}
				onMouseUp={() => (context.allowDrag&&context.onDragEndDraggable())}
				onDragStart={e => context.allowDrag&&context.onDragStartDraggable(atom)}
				onDragEnd={() => context.onDragEndDraggable()} 
				onDrop={e =>context.allowDrag&&context.onDropDraggable(e, atom, draggableRef)} 
				onDragOver={e =>context.allowDrag&&context.onDragOverDraggable(e, atom, draggableRef)} 
				onDragLeave={() => context.allowDrag&&context.onDragLeaveDraggable(draggableRef)}
				
				>
				{children}
			</div>
		</>
    )
}


export default React.memo(Draggable)
