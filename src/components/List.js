import React from 'react'

export default function List() {
    const data = [  {id:1, title: "temp child 1", notes: "notes...", indent:0, completed: false, hidden: false},
                    {id:2, title: "temp child 1.1", notes: "notes...", indent:1, completed: false, hidden: false},
                    {id:3, title: "temp child 2 completed", notes: "", indent:0, completed: true, hidden: false},
                    {id:4, title: "temp child 3", indent:0, completed: false, hidden: false},
                    {id:5, title: "temp child 3.1", notes: "notes...", indent:1, completed: false, hidden: false},
                    {id:6, title: "temp child 3.1.1", notes: "notes...", indent:2, completed: false, hidden: true}]
    return (
        <>
            <ul>
            {data.map(atom => {
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
            })}
            </ul>
        </>
    )
}
