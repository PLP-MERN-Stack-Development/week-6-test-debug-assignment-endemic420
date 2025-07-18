import { renderHook, act } from '@testing-library/react';
import useAuth from '../../../hooks/useAuth';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};
global.localStorage = localStorageMock;

describe('useAuth Hook', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it('should initialize with null user and false isAuthenticated', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should login user successfully', () => {
    const { result } = renderHook(() => useAuth());
    
    const mockUser = { id: 1, username: 'testuser' };
    const mockToken = 'mockToken123';
    
    act(() => {
      result.current.login(mockUser, mockToken);
    });
    
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken);
  });

  it('should logout user successfully', () => {
    const { result } = renderHook(() => useAuth());
    
    // First login
    act(() => {
      result.current.login({ id: 1, username: 'testuser' }, 'token');
    });
    
    // Then logout
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
  });
});