import React from 'react'
import {useEffect} from 'react'
import {fetchData, noEmptyList} from '../store/actions'
import { useDispatch,  useSelector } from 'react-redux'
import Atom from './Atom'

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
    
    if (listState.length === 0) {
        noEmptyList()
    }
    
	return (
		<>
          	<div >
				{listState.loadingData ? <h1> Loading data </h1> :
                listState.listContent ? 
					<ul className="listContainer">
						{listState.listContent.map((atom) => {
							if(atom.hidden === false){
								return(
									<li >
										<Atom
											atom={atom}
											dispatch={dispatch}
											>
										</Atom> 
									</li>
								)
							}else{
								return null
							}
						})}
					</ul> :
                null
            	}

            </div> 
        </>
    )
}

