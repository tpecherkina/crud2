import React, { useState, useEffect } from 'react';
import PostsContext from './PostsContext';

export default function PostsProvider(props) {
    const [posts, setPosts] = useState([]);
    
    const loadFromServer = () => {
        fetch('http://localhost:7777/posts')
        .then(response => response.json())
        .then(posts => {
          setPosts(posts);
        });
    };

    useEffect(loadFromServer, []);

    const uploadToServer = ({ id = 0, content }) => {
        fetch('http://localhost:7777/posts', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
          body: JSON.stringify({ id, content }),
        })
        .then(loadFromServer);
    }

    const deleteFromServer = (id) => {
      fetch(`http://localhost:7777/posts/${id}`, {
        method: 'DELETE'
      })
      .then(loadFromServer);
  }

    return (
        <PostsContext.Provider value={{posts, uploadToServer, deleteFromServer }}>
            {props.children}
        </PostsContext.Provider>
    )
}