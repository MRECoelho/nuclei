import React, {useEffect} from 'react'
import {fetchData, noEmptyList} from '../store/actions'
import { useDispatch,  useSelector } from 'react-redux'
import Atom from './Atom'
import DragContext from './DragContext'
import Draggable from './Draggable'

export default function List() {

    const dispatch = useDispatch()
	const listState = useSelector(state => state.list);
	
	useEffect(() => {
        dispatch(fetchData())
        // dispatch(fetchData)
        // return () => {
        //   cleanup
        // }
      }, [dispatch])
    
    if (listState.listContent.length === 0) {
        noEmptyList()
	}

	return (
		<>
			{/* {console.log("render: list")} */}
			{listState.loadingData ? <h1> Loading data </h1> :
			listState.listContent ? 
				<DragContext list = {listState.listContent}>
						{listState.listContent.map((atom) => {
							return(
								<Draggable
									atom = {atom}
									key={atom.id}
									>	
										<Atom
											atom={atom}
											dispatch={dispatch}
											focussed={listState.focussedAtomId === atom.id}
											focussedField={listState.focussedField}
											
											/> 
									</Draggable>
								)
							})}
				</DragContext> :
				null
            }
        </>
    )
}

