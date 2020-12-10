import { useState, useEffect } from 'react'
import './App.css';
import RenderItems from './render-items';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import db from './firebase';
import firebase from 'firebase/app';

function App() {

  const [FirestoreData, setFirestoreData] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [time, setTime] = useState('')

  // Date Time
  var today = new Date();
  var dateTime = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + "    " +
    today.getHours() + ":" + today.getMinutes();

  //  
  useEffect(() => {
    db.collection("STUDENTS").onSnapshot(function (querySnapshot) {
      setFirestoreData(
        querySnapshot.docs.map((doc) => ({
          keyId: doc.id,
          i: doc.data().ID,
          n: doc.data().NAME,
          d: doc.data().DETAILS,
          t: doc.data().TIME,
        }))

      )
    })

  }, [])


  // 
  const Add = (e) => {
    db.collection("STUDENTS").add({
      ID: id,
      NAME: name,
      DETAILS: details,
      TIME: dateTime,
      SERVERTIMESTAMP: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(() => {
        setId("")
        setName("")
        setDetails("")
        setTime("")
        alert('✅ Successfully Added')
      })
      .catch((error) => {
        console.log(error.message);
        alert('⚠️', error.message)
      });

  }


  //  
  const [searchFirebaseKey, setSearchFirebaseKey] = useState('')
  const Search = () => {
    // console.log(searchFirebaseKey)
    db.collection("STUDENTS").doc(searchFirebaseKey).get()
      .then(function (doc) {
        setId(doc.data().ID)
        setName(doc.data().NAME)
        setDetails(doc.data().DETAILS)
        setTime(doc.data().TIME)
      })
      .then(() => {
        alert('✅ Search Successfull')
      })
      .catch((error) => {
        console.log(error.message);
        alert('⚠️ This Key Is Not Present In Database', error.message)
      });
  }


  // 
  const Update = () => {
    db.collection("STUDENTS").doc(searchFirebaseKey).update({
      ID: id,
      NAME: name,
      DETAILS: details,
      TIME: dateTime,
      SERVERTIMESTAMP: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(() => {
        setId("")
        setName("")
        setDetails("")
        setTime("")
        alert('✅ Updated Successfully')
      })
      .catch((error) => {
        console.log(error.message);
        alert('⚠️ This Key Is Not Present In Database', error.message)
      });
  }


  // 
  const Delete = () => {
    db.collection("STUDENTS").doc(searchFirebaseKey).delete()
      .then(() => {
        setId("")
        setName("")
        setDetails("")
        setTime("")
        alert('✅ Deleted')
      })
      .catch((error) => {
        console.log(error.message);
        alert('⚠️ This Key Is Not Present In Database', error.message)
      });
  }


  return (
    <div className="center">
      <h1>FIREBASE FIRESTORE CURD OPERATIONS</h1>
      <TextField id="tf" label="Key" value={searchFirebaseKey} onChange={(s) => setSearchFirebaseKey(s.target.value)} /> <br /><br />

      <TextField id="tf" label="ID" value={id} onChange={(e) => setId(e.target.value)} /><br /><br />
      <TextField id="tf" label="Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
      <TextField id="tf" label="Deatils" value={details} onChange={(e) => setDetails(e.target.value)} /><br /><br />
      <TextField id="tf" label="Date   Time" disabled={true} value={dateTime} onChange={(e) => setTime(e.target.value)} /> <br /><br /><br />

      <Button variant="contained" color="primary" onClick={Add}  ><AddBoxOutlinedIcon />&nbsp;INSERT</Button>&nbsp;&nbsp;
      <Button variant="contained" color="primary" disabled={!searchFirebaseKey} onClick={Search}  ><SearchIcon />&nbsp;SEARCH </Button>&nbsp;&nbsp;
      <Button variant="contained" color="primary" onClick={Update}  ><UpdateIcon />&nbsp;UPDATE</Button>&nbsp;&nbsp;
      <Button variant="contained" color="primary" onClick={Delete}  ><DeleteOutlineIcon />&nbsp;DELETE</Button>

      <br />
      <br />

      {/* TODO */}
      <div className="width" >
        {FirestoreData.map((demo, index) => {
          return <RenderItems keyId={demo.keyId} i={demo.i} n={demo.n} d={demo.d} t={demo.t} key={index} />
        })}
      </div>

    </div>
  );
}

export default App;
