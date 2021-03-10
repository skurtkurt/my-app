import logo from './logo.svg';
import './App.css';


import { withAuthenticator,  } from 'aws-amplify-react';
import { button } from 'aws-amplify';

import { DataStore } from '@aws-amplify/datastore';
import { Post } from './models';
import { useEffect, useState } from 'react';

function App() {
const [post, setPost] = useState([]);

useEffect(() => {
  const func = async () => {
    const models = await DataStore.query(Post);
    setPost(models)
  }

  func()
}, [])

  const createPost = async () => {
    const post = {
      title: window.prompt('blog post title'),
      content: window.prompt('blog post content')
    }

    const newPost = await DataStore.save(
      new Post(post)
    );
  }



  return (
    <div className="App">
      <button onClick={createPost}>Create a Post</button>
      {post.map(post => <div key={post.id}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
      )}
      
    </div>
  );
}

export default withAuthenticator(App, true);
