const mongoose = require('mongoose');
const Post = require('../../../src/models/Post');

describe('Post Model', () => {
  it('should be invalid if title is empty', () => {
    const post = new Post({
      content: 'Some content',
      author: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId()
    });

    const validationError = post.validateSync();
    expect(validationError.errors.title).toBeDefined();
  });

  it('should be invalid if content is empty', () => {
    const post = new Post({
      title: 'Some title',
      author: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId()
    });

    const validationError = post.validateSync();
    expect(validationError.errors.content).toBeDefined();
  });

  it('should generate slug from title', () => {
    const post = new Post({
      title: 'This is a Test Post',
      content: 'Some content',
      author: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId()
    });

    // Assuming you have a pre-save hook that generates slug
    expect(post.slug).toBe('this-is-a-test-post');
  });

  it('should be valid with all required fields', () => {
    const post = new Post({
      title: 'Valid Post',
      content: 'Valid content',
      author: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId(),
      slug: 'valid-post'
    });

    const validationError = post.validateSync();
    expect(validationError).toBeUndefined();
  });
});