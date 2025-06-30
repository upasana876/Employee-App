import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [commentText, setCommentText] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${API}/posts`).then(res => setPosts(res.data));
  }, []);

  const login = async () => {
    const res = await axios.post(`${API}/auth/login`, {
      username: prompt('Username'),
      password: prompt('Password'),
    });
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
  };

  const post = async () => {
    await axios.post(`${API}/posts`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  const likePost = async (id) => {
    await axios.post(\`\${API}/posts/\${id}/like\`, {}, {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    window.location.reload();
  };

  const comment = async (id) => {
    await axios.post(\`\${API}/posts/\${id}/comment\`, { text: commentText }, {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    setCommentText('');
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>Social App</h1>
      {!token ? (
        <button onClick={login}>Login</button>
      ) : (
        <div>
          <textarea value={content} onChange={e => setContent(e.target.value)} />
          <button onClick={post}>Post</button>
        </div>
      )}

      {posts.map((p, i) => (
        <div key={i} className="post">
          <p>{p.content}</p>
          <button onClick={() => likePost(p._id)}>❤️ {p.likes.length}</button>
          <ul>
            {p.comments.map((c, j) => (
              <li key={j}>{c.text}</li>
            ))}
          </ul>
          <input placeholder="comment..." value={commentText} onChange={e => setCommentText(e.target.value)} />
          <button onClick={() => comment(p._id)}>Comment</button>
        </div>
      ))}
    </div>
  );
}

export default App;