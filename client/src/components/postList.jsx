import React from 'react';
import PostItem from './postItem';

const PostList = ({ posts, onEdit, onDelete, onLike }) => {
  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <h3>No posts yet</h3>
        <p>Be the first to create a post!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem
          key={post._id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
        />
      ))}
    </div>
  );
};

export default PostList;