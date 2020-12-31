import React, { useState, useEffect } from 'react';
import { app } from './base';

const db = app.firestore();

const ImageForm = () => {

  const [ fileUrl, setFileUrl ] = useState(null);
  const [ users, setUsers ] = useState([]);

  const onFileChange = async(event) => {
    const file = event.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  console.log(users)

  const onSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    if (!username) {
      return;
    }
    db.collection("users").doc(username).set({
      name: username,
      avatar: fileUrl
    })
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await db.collection("users").get()
        setUsers(usersCollection.docs.map(doc => {
          return doc.data();
        }))
      } catch(err) {
        console.error(err)
      }
    }
    fetchUsers();
  }, [])

  return (
    <>
    <form onSubmit={ onSubmit }>
      <input type="file" onChange={ onFileChange }/>
      <input type="text" name="username" placeholder="Name"/>
      <button>Submit</button>
    </form>
    <ul>
      {
        users.map(user => (
          <li key={ user.name }>
            <img width="100" height="100" src={ user.avatar } alt={ user.name } />
            <p>{ user.name }</p>
          </li>
        ))
      }
    </ul>
    </>

  );
};

export default ImageForm;
