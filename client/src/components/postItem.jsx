import React from 'react';

const PostItem = ({ post, onEdit, onDelete, onLike }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post._id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        <div className="post-meta">
          <span className="post-author">by {post.author}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="post-actions">
        <button 
          className="btn btn-like"
          onClick={() => onLike(post._id)}
        >
          👍 {post.likes}
        </button>
        
        <button 
          className="btn btn-edit"
          onClick={() => onEdit(post)}
        >
          Edit
        </button>
        
        <button 
          className="btn btn-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;