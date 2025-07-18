import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './components/postList';
import PostForm from './components/postForm';
import './App.css';

const API_URL = 'http://localhost:5000/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async (postData) => {
    try {
      const response = await axios.post(API_URL, postData);
      setPosts([response.data, ...posts]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create post');
      console.error('Error creating post:', err);
    }
  };

  // Update a post
  const updatePost = async (id, postData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, postData);
      setPosts(posts.map(post => 
        post._id === id ? response.data : post
      ));
      setEditingPost(null);
      setError(null);
    } catch (err) {
      setError('Failed to update post');
      console.error('Error updating post:', err);
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPosts(posts.filter(post => post._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  // Like a post
  const likePost = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/like`);
      setPosts(posts.map(post => 
        post._id === id ? response.data : post
      ));
      setError(null);
    } catch (err) {
      setError('Failed to like post');
      console.error('Error liking post:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Post App</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create New Post'}
        </button>
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        {(showForm || editingPost) && (
          <PostForm
            post={editingPost}
            onSubmit={editingPost ? 
              (data) => updatePost(editingPost._id, data) : 
              createPost
            }
            onCancel={() => {
              setShowForm(false);
              setEditingPost(null);
            }}
          />
        )}

        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : (
          <PostList
            posts={posts}
            onEdit={setEditingPost}
            onDelete={deletePost}
            onLike={likePost}
          />
        )}
      </main>
    </div>
  );
}

export default App;