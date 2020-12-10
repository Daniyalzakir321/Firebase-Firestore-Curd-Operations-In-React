import React from 'react'
import db from './firebase';
import Paper from '@material-ui/core/Paper';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


export default function RenderItems({keyId,i,n,d,t}) {
    
  const deleteSingleTodo =()=>{
    // console.log(keyId)
db.collection('STUDENTS').doc(keyId).delete();
  }


const updateSingleTodo =()=>{
db.collection('STUDENTS').doc(keyId).update({

})
}
    return (
            <Paper elevation={3} style={{ textAlign: 'left', paddingLeft: 10 }}>
                <p>Key:  &nbsp; &nbsp; &nbsp; {keyId}</p>
                <p>ID:  &nbsp; &nbsp; &nbsp; &nbsp; {i}</p>
                <p>Name: &nbsp;&nbsp;{n}</p>
                <p>Details: &nbsp;{d}</p>
                <p>Time:  &nbsp; &nbsp; {t}</p>
            <DeleteOutlineIcon onClick={deleteSingleTodo} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<UpdateIcon /><br />
            </Paper>
    )
}
