import React, { useState } from 'react'
import { getSubTree } from '../helperFunctions'
import * as dndviz from '../dragAndDropVisuals'

export const DragAPIContext = React.createContext({});

const DragContext = props => {
	const [subtreeDrag, setSubtreeDrag] = useState({ subtree: [], startIndex: null, stopIndex: null })
	const [allowDrag, setAllowDrag] = useState(false)

	// const [atomDropRelation, setAtomDropRelation] = useState(dndviz.atomDropRelationEnum.NONE)

	// TODO: rename functions, ex: onDragStartLi => onDragStartDraggable

	const onDragStartDraggable = (atom) => {
		// This function is fired for the atom you start dragging. At that point the the children
		// of that atom need to be calculated and the whole subtree needs to be saved to the
		// subtreeDrag state. Due to the style tag in the render function, all atoms in the
		// subtreeDrag state will get new style to indicate which atoms are being dragged.
		setSubtreeDrag(() => {
			const newSubtreeState = getSubTree(props.list, atom.id)
			return newSubtreeState
		})
	}

	const onDropDraggable = (e, atom, ref) => {
		// W.I.P.

		// On drop function for the <div /> component (containing the Atom component)
		// is only fired when over a valid drop zone and handles the bulk of the draggging
		// operation by dispatching the update action to mutate the list. In case the user tries
		// to drop the dragged part onto itself nog update action is dispathed for obvious reasons.
		// Beside possibly dispatching an action it also removes the visual indiaction of the 
		// dragging operation.
		// Note that the list (<ul />) also handles a ondrop funtion that only acts a clean up. 

		// check before after none
		// if before/after -> dispatch action with instructions
		// in action nev list order will be calculated and applied
		// reset atomDropRealtion
		// stop visuals of drop zone

		const atomDropRelation = dndviz.calculateAtomToDropzoneRelation(e, subtreeDrag, props.list, atom, ref)
		if (subtreeDrag.subtree.length > 0) {
			console.log(`trying to drop subtree ${atomDropRelation} ${atom.id}`)

			// isValid? dispatch action to handle asycn stuff, then reducer for state/store mutation
		}
		// setAtomDropRelation( dndviz.atomDropRelationEnum.NONE)
		dndviz.removeDropzoneVisuals(ref)
	}

	const onDragEndDraggable = () => {
		// At the end of a drag, even in the case when above a non valid drop zone, the subtreeDrag 
		// state need to be updated signifiying the end of a drag operation.
		// Note that the dragEnd operation always gets fired.
		// Finally it set allowDrag to false to prevent the user dragging an atom from i
		// its container ( <div />) instead of from the AtomControl handle

		if (subtreeDrag.subtree.length > 0) {
			// dndviz.removeTreeSelectionVisuals(subtreeDrag.subtree)
			setSubtreeDrag({ subtree: [], startIndex: null, stopIndex: null })
		}
		setAllowDrag(false)
	}

	const onDragOverDraggable = (e, atom, ref) => {
		// When over a potential drop zone, apply the visuals to it. The prevenDefault() 
		// disables the default behaviour when over a link.

		e.preventDefault();
		const newAtomDropRelation = dndviz.calculateAtomToDropzoneRelation(e, subtreeDrag, props.list, atom, ref)
		dndviz.setDropzoneVisuals(ref, newAtomDropRelation)
	}

	const onDragLeaveDraggable = ref => {
		// Leaving a drop zone only updates the visual indication of dragging over that drop zone.
		dndviz.removeDropzoneVisuals(ref)
	}

	return (
		<div className="listContainer"
			onDragOver={e => e.preventDefault()}
		>
			<DragAPIContext.Provider value={{
				onDragStartDraggable,
				onDropDraggable,
				onDragEndDraggable,
				onDragOverDraggable,
				onDragLeaveDraggable,
				allowDrag,
				setAllowDrag,
				subtreeDrag,
				setSubtreeDrag,
			}}>
				{props.children}
			</DragAPIContext.Provider>
		</div>
	)
}

export default DragContext
