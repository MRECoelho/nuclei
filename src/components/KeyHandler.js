import React, { useCallback } from 'react'
import { HotKeys } from 'react-hotkeys'
import { useDispatch } from 'react-redux'
import { indentSubtree, unindentSubtree, hideChildren, unhideChildren, toNextAtom, toPrevAtom, toNotes, deleteActions, addAtom } from '../store/actions'

const KeyHandler = props => {
    const dispatch = useDispatch()

    const keyMap = {
        ADD_ATOM: "ctrl+enter",
        COLLAPSE_ATOM: "ctrl+ArrowLeft",
        UNCOLLAPSE_ATOM: "ctrl+ArrowRight",
        INDENT_ATOM: "tab",
        OUTDENT_ATOM: "shift+tab",
        TO_PREVIOUS_ATOM: "ArrowUp",
        TO_NEXT_ATOM: "ArrowDown",
        TO_NOTES: "shift+enter",
        DELETE_ACTIONS: "backspace",
        FORCE_DELETE_ACTIONS: "ctrl+backspace",
        // CONSOLE:"ctrl+`" // FUTURE IMPL: add more advanced commands, vim like behaviour
        // MOVE_ATOM_UP: "ctrl+shift+ArrowUp",
        // MOVE_ATOM_DOWN: "ctrl+shift+ArrowDown",
        // SEARCH: "alt+s",
        // INDENT: "tab",
        // UNINDENT: "shift+tab",
        // SELECT_PREV: "up",
        // SELECT_NEXT: "down",
        // COLLAPSE:"alt+enter",
        // PREVENT: "tab"
    };

    const handlers = {
        ADD_ATOM: useCallback((event) => { event.preventDefault(); dispatch(addAtom()) }, [dispatch]),
        // DELETE_ATOM:  useCallback((event) => { event.preventDefault();console.log("delete atom called") }, []),
        COLLAPSE_ATOM: useCallback((event) => { event.preventDefault(); dispatch(hideChildren()) }, [dispatch]),
        UNCOLLAPSE_ATOM: useCallback((event) => { event.preventDefault(); dispatch(unhideChildren()) }, [dispatch]),
        INDENT_ATOM: useCallback((event) => { event.preventDefault(); dispatch(indentSubtree()) }, [dispatch]),
        OUTDENT_ATOM: useCallback((event) => { event.preventDefault();; dispatch(unindentSubtree()) }, [dispatch]),
        TO_PREVIOUS_ATOM: useCallback((event) => { event.preventDefault(); dispatch(toPrevAtom()) }, [dispatch]),
        TO_NEXT_ATOM: useCallback((event) => { event.preventDefault(); dispatch(toNextAtom()) }, [dispatch]),
        TO_NOTES: useCallback((event) => { event.preventDefault(); dispatch(toNotes()) }, [dispatch]),
        DELETE_ACTIONS: useCallback((event) => { if (event.target.value === "") { dispatch(deleteActions()) } }, [dispatch],),
        FORCE_DELETE_ACTIONS: useCallback((event) => { event.preventDefault(); dispatch(deleteActions(true)) }, [dispatch],),
        // CONSOLE:  useCallback((event) => {  console.log("entering console") },[],),
        // OUTDENT_ATOM:  useCallback((event) => { event.preventDefault();console.log("outdent atom called") }, []),
        // MOVE_ATOM_UP:  useCallback((event) => { event.preventDefault();console.log("move up atom called") }, []),
        // MOVE_ATOM_DOWN:  useCallback((event) => { event.preventDefault();console.log("move down atom called") }, []),
        // SEARCH:  useCallback((event) => { event.preventDefault();console.log("search called") }, []),
        // ADD_ATOM: useCallback((event) => { console.log("add atom called") }, []),
        // ANOTHER_ATOM: useCallback((event) => { console.log("antoerh atom called") }, []),
        // PREVENT: (event=> {event.preventDefault();
        // console.log("did the prevent")
        //     }),
        // ADD:    useCallback((event) => { keyDownHandler.lol(setList, focusRef.current, event) }, [list, focusRef.current]),
        // INDENT: useCallback((event) => { keyDownHandler.indent(list, setList, focusRef.current,event) }, [list, focusRef.current]),
        // UNINDENT: useCallback((event) => {keyDownHandler.unindent(setList, focusRef.current, event)}, []),
        // SELECT_PREV: useCallback((event) => {keyDownHandler.selectPreviousAtom(list, setCurrentlyFocussed, refs)}, [list, refs]),
        // SELECT_NEXT: useCallback((event) => {keyDownHandler.selectNextAtom(list, setCurrentlyFocussed, refs, event)}, [list, refs]),
        // COLLAPSE: useCallback((event) => {keyDownHandler.collapseAtom(setList, focusRef.current, event)}, [])
    };

    return (

        <HotKeys keyMap={keyMap} handlers={handlers} className="keyhandler">
            {props.children}
        </HotKeys>

    )
}

export default KeyHandler
