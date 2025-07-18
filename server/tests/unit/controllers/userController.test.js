const userController = require('../../../src/controllers/userController');
const User = require('../../../src/models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../../src/utils/auth');

jest.mock('../../../src/models/User');
jest.mock('bcryptjs');
jest.mock('../../../src/utils/auth');

describe('User Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {}, user: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn()
    };
    next = jest.fn();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      req.body = userData;

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      
      const savedUser = {
        _id: 'userId123',
        username: 'testuser',
        email: 'test@example.com',
        save: jest.fn().mockResolvedValue(true)
      };
      
      User.mockImplementation(() => savedUser);
      generateToken.mockReturnValue('mockToken');

      await userController.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: expect.objectContaining({
          id: 'userId123',
          username: 'testuser'
        })
      });
    });

    it('should return error if user already exists', async () => {
      req.body = {
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue({ email: 'existing@example.com' });

      await userController.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'User already exists'
      });
    });
  });
});