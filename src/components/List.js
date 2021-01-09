import React from 'react'
import {useEffect} from 'react'
import {fetchData} from '../store/actions'
import {store} from '../store/store'
import { useDispatch,  useSelector } from 'react-redux'
import Atom from './Atom'

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
                                <Atom 
                                    atom={atom}
                                    dispatch={dispatch}
                                ></Atom>
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

