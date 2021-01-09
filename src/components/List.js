import React, { useState } from 'react'
import { useReducer } from 'react'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchData} from '../store/actions'
import {listReducer} from '../store/reducers'
import {initialStoreState} from '../store/store'
import {store} from '../store/store'
import { useDispatch,  useSelector } from 'react-redux'
import thunk from 'redux-thunk';
// import { useDispatch } from 'react-redux'

export default function List() {

    const dispatch = useDispatch()
    const listState = useSelector(state => state.list);

    useEffect(() => {
        dispatch(fetchData())
        // dispatch(fetchData)
        // return () => {
        //   cleanup
        // }
      }, [])

    return (
        <>  
            <ul>
            {listState.isLoading ? <h1> Loading data </h1> :
                listState.listContent ? 
                listState.listContent.map(atom => {
                    if(atom.hidden === false){
                        return(
                            <li key={atom.id}>
                                <div className="atomContentContainer">
                                    <div className="atomContentTitle">{atom.title}</div>
                                    <div className="atomContentNotes">{atom.notes}</div>
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

