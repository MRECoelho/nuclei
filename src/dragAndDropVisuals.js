import {isAtomInSubTree} from './helperFunctions'
export const atomDropRelationEnum = {
	BEFORE: "before",
	AFTER: "after",
	NONE: "none",
 }

const DRAG_TREE_SELECTED = "dragTreeSelected"
const DRAG_OVER_BOTTOM = "dragOverBottom"
const DRAG_OVER_TOP = "dragOverTop"

export const calculateAtomToDropzoneRelation = (event, subtreeDrag, list, atom, ref) => {
    if(! isAtomInSubTree(atom, subtreeDrag.subtree)){
        const isMouseAtTopside = event.pageY < ref.offsetTop+ref.clientHeight/2
        if(isMouseAtTopside ) {
            const nextIndex  = Math.min(subtreeDrag.stopIndex + 1 , list.length-1) 
            if (list[nextIndex].id !== atom.id){
                return atomDropRelationEnum.BEFORE
            }
        } else {
            const prevIndex  = Math.max(subtreeDrag.startIndex - 1 , 0) 
            if (list[prevIndex].id !== atom.id){
                return atomDropRelationEnum.AFTER
            }
        }
    }
    return atomDropRelationEnum.NONE
}

export const applyDragTreeVisuals = (subtree, atomId) =>{
    return subtree.map(atom => atom.id).includes(atomId)? DRAG_TREE_SELECTED :  ""
}

export const setDropzoneVisuals = (ref,atomDropRelation) => {
    if (ref !== null){
        removeDropzoneVisuals(ref)
        applyDropzoneVisuals(ref, atomDropRelation)
    }
}

const applyDropzoneVisuals = (ref, atomDropRelation) => {    
    switch(atomDropRelation) {
        case atomDropRelationEnum.BEFORE:
            ref.classList.add(DRAG_OVER_TOP)
            break
        case atomDropRelationEnum.AFTER:
            ref.classList.add(DRAG_OVER_BOTTOM)
            break
        default:
            break
          // no action taken  
    }   
}

export const removeDropzoneVisuals = (ref) => {
    ref.classList.remove(DRAG_OVER_TOP)
    ref.classList.remove(DRAG_OVER_BOTTOM)
}