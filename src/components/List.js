import React, { useState } from 'react'
import { useReducer } from 'react'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchData, focusAtom, blurAtom} from '../store/actions'
import {listReducer} from '../store/reducers'
import {initialStoreState} from '../store/store'
import {store} from '../store/store'
import { useDispatch,  useSelector } from 'react-redux'
import thunk from 'redux-thunk';
import TextareaAutosize from 'react-textarea-autosize'
import AtomControl from './AtomControl'
// import { useDispatch } from 'react-redux'

export default function List() {

    const dispatch = useDispatch()
    const listState = useSelector(state => state.list);

    store.subscribe( () => {console.log("deteted change: ", store.getState())})

    useEffect(() => {
        dispatch(fetchData())
        // dispatch(fetchData)
        // return () => {
        //   cleanup
        // }
      }, [])

    function onFocusWrapper(atomId, e) {
        dispatch(focusAtom(atomId, e.target.name))
    }

    function onBlurWrapper(atomId, e){
        dispatch(blurAtom(atomId, e.target.name))
    }

    return (
        <>  
        {console.log("render!")}
            <ul className="listContainer">
            {listState.isLoading ? <h1> Loading data </h1> :
                listState.listContent ? 
                listState.listContent.map(atom => {
                    if(atom.hidden === false){
                        return(
                            <li key={atom.id}>
                                <div className="atomContainer" style={{marginLeft:atom.indent*35 + 15/atom.indent}}>
                                    <AtomControl></AtomControl>
                                    <div className="atomContentContainer">
                                        <TextareaAutosize
                                            name="title"
                                            className="textarea textarea-title"
                                            value={atom.title}
                                            minRows={1}
                                            spellCheck="false"
                                            // onChange={onChangeTitleEvent}
                                            onFocus={e => onFocusWrapper(atom.id, e)}
                                            onBlur={e => onBlurWrapper(atom.id, e)}
                                            
                                            // ref={ref}
                                        ></TextareaAutosize>
                                        {atom.notes?
                                        <TextareaAutosize
                                            name="notes"
                                            className="textarea textarea-notes"
                                            value={atom.notes}
                                            minRows={1}
                                            spellCheck="false"
                                            // onChange={onChangeTitleEvent}
                                            onFocus={e => onFocusWrapper(atom.id, e)}
                                            onBlur={e => onBlurWrapper(atom.id, e)}
                                            
                                            // ref={ref}
                                        ></TextareaAutosize> :
                                        null
                                        }

                                    </div>
                                    {/* <div className="atomContentTitle">{atom.title}</div> */}
                                    {/* <div className="atomContentNotes">{atom.notes}</div> */}
                                </div>
                            </li>
                        )
                    }else{
                        return null
                    }
                }) :
                null
            }
            
            </ul>
        </>
    )
}

