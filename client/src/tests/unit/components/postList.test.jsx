import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostList from '../../../components/PostList';

const mockPosts = [
  {
    _id: '1',
    title: 'First Post',
    content: 'First post content',
    author: { username: 'john' },
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Second Post',
    content: 'Second post content',
    author: { username: 'jane' },
    createdAt: '2023-01-02T00:00:00.000Z'
  }
];

describe('PostList Component', () => {
  it('renders posts correctly', () => {
    render(<PostList posts={mockPosts} />);
    
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('john')).toBeInTheDocument();
    expect(screen.getByText('jane')).toBeInTheDocument();
  });

  it('displays empty state when no posts', () => {
    render(<PostList posts={[]} />);
    
    expect(screen.getByText('No posts found')).toBeInTheDocument();
  });

  it('calls onPostClick when post is clicked', () => {
    const mockOnPostClick = jest.fn();
    render(<PostList posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    fireEvent.click(screen.getByText('First Post'));
    expect(mockOnPostClick).toHaveBeenCalledWith(mockPosts[0]);
  });

  it('displays loading state', () => {
    render(<PostList posts={[]} loading={true} />);
    
    expect(screen.getByText('Loading posts...')).toBeInTheDocument();
  });
});