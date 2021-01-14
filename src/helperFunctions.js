export const getSubTree = (list, atomId) => {
    // let atomd = null
    let startIndex = null
    let refIndent = null
    let start = false
    let skip = false
    let subtree = list.slice().filter((atom, index) => {
        if(skip === false){
            if(atom.id === atomId){
                startIndex = index
                refIndent = atom.indent
                start = true
                return atom
            } else if ( start === true && skip === false){
                if (atom.indent > refIndent) {
                    return atom
                } else {
                    skip = true
                }
            } 
        }
    })

    const stopIndex = startIndex + subtree.length - 1
    return {subtree, startIndex, stopIndex} 
}

// export const getSubTreeRange = (list, atomId) => {
//     const {subtree, refIndex} = getSubTree(list, atomId)
//     const startIndex = refIndex
//     const stopIndex = startIndex + subtree.length - 1
//     return {startIndex, stopIndex}
// }

const indentAtom = (atom) => {
    return { ...atom, indent: atom.indent + 1}
}

const indentTree = (list) => {
    return list.map(atom => indentAtom(atom))
}

export const tryIndent = (list, atomId) => {
    const {subtree, startIndex, stopIndex} = getSubTree(list, atomId)
    if(startIndex === 0 ){
        // first atom cannot be indented
        return {canIndent: false, payload: null}
    } else if (list[startIndex-1].indent < subtree[0].indent){
        // cannot indent atom if it's a child of previous atom
        return {canIndent: false, payload: null}
    } else {
        return {canIndent: true, payload: {startIndex, stopIndex}}
    }
}

export const tryUnindent = (list, atomId) => {
    const {subtree, startIndex, stopIndex} = getSubTree(list, atomId)
    if(subtree[0].indent === 0 ){
        // 0 indent is minimum
        return {canUnindent: false, payload: null}
    } else {
        return {canUnindent: true, payload: {startIndex, stopIndex}}
    }
}

export const newAtom = (list, refAtomId, atomParams) => {
    const {subtree, startIndex} = getSubTree(list, refAtomId)
    const hasChildren = subtree.length === 1 ? false : true

    
    if(hasChildren){
        // if ref atom has children, insert as first child
        return {
            index: startIndex + 1,
            newAtom: createAtom({ ...atomParams, indent: subtree[0].indent + 1})
        }
    } else {
        // else insert new atom as sibling
        return {
            index: startIndex + 1,
            newAtom: createAtom({ ...atomParams, indent: subtree[0].indent})
        }
    }
}

export const createAtom = (atomParams) => {
    if(atomParams){
        return { ...NEW_ATOM_TEMPLATE, ...atomParams}
    } else {
        return NEW_ATOM_TEMPLATE
    }
}

const NEW_ATOM_TEMPLATE = {
    title: "",
    notes: "",
    indent: 0,
    hidden: false,
}