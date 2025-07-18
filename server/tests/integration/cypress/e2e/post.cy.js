describe('Posts Management', () => {
  beforeEach(() => {
    // Setup test data
    cy.task('seedDatabase');
    
    // Login before each test
    cy.visit('/login');
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=password-input]').type('password123');
    cy.get('[data-cy=login-button]').click();
    
    cy.url().should('include', '/dashboard');
  });

  it('should display posts on dashboard', () => {
    cy.visit('/posts');
    
    cy.get('[data-cy=post-list]').should('be.visible');
    cy.get('[data-cy=post-item]').should('have.length.greaterThan', 0);
  });

  it('should create a new post', () => {
    cy.visit('/posts/new');
    
    cy.get('[data-cy=title-input]').type('New Test Post');
    cy.get('[data-cy=content-input]').type('This is a new test post content');
    cy.get('[data-cy=category-select]').select('Technology');
    
    cy.get('[data-cy=submit-button]').click();
    
    cy.url().should('include', '/posts');
    cy.get('[data-cy=success-message]').should('contain', 'Post created successfully');
    cy.get('[data-cy=post-item]').should('contain', 'New Test Post');
  });

  it('should edit an existing post', () => {
    cy.visit('/posts');
    
    cy.get('[data-cy=post-item]').first().click();
    cy.get('[data-cy=edit-button]').click();
    
    cy.get('[data-cy=title-input]').clear().type('Updated Post Title');
    cy.get('[data-cy=submit-button]').click();
    
    cy.get('[data-cy=success-message]').should('contain', 'Post updated successfully');
    cy.get('[data-cy=post-title]').should('contain', 'Updated Post Title');
  });

  it('should delete a post', () => {
    cy.visit('/posts');
    
    cy.get('[data-cy=post-item]').first().click();
    cy.get('[data-cy=delete-button]').click();
    
    cy.get('[data-cy=confirm-delete]').click();
    
    cy.get('[data-cy=success-message]').should('contain', 'Post deleted successfully');
    cy.url().should('include', '/posts');
  });
});