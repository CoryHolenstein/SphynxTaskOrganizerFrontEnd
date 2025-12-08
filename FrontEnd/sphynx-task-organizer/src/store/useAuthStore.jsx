import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useAuthStore = create(
  devtools((set, get) => ({
    user: null,
    isAuthenticated: false,
    isIncognito: false,
    token: null,

    // Login with incognito mode
    loginIncognito: (username = 'Guest User') => {
      const incognitoUser = {
        id: Math.random().toString(36).substring(7),
        username: username,
        email: `${username.toLowerCase().replace(' ', '.')}@incognito.local`,
        isIncognito: true,
        loginTime: new Date().toISOString(),
      };

      set({
        user: incognitoUser,
        isAuthenticated: true,
        isIncognito: true,
        token: `incognito_${Math.random().toString(36).substring(2, 11)}`,
      });
    },

    // Login with credentials (placeholder for future API integration)
    login: (email, password) => {
      // TODO: Replace with actual API call
      const user = {
        id: Math.random().toString(36).substring(7),
        username: email.split('@')[0],
        email: email,
        isIncognito: false,
        loginTime: new Date().toISOString(),
      };

      set({
        user: user,
        isAuthenticated: true,
        isIncognito: false,
        token: `token_${Math.random().toString(36).substring(2, 11)}`,
      });
    },

    // Logout
    logout: () => {
      set({
        user: null,
        isAuthenticated: false,
        isIncognito: false,
        token: null,
      });
    },

    // Get current user
    getUser: () => get().user,

    // Check if user is authenticated
    getIsAuthenticated: () => get().isAuthenticated,

    // Check if in incognito mode
    getIsIncognito: () => get().isIncognito,

    // Get auth token
    getToken: () => get().token,

    // Update user info
    updateUser: (updates) => {
      set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      }));
    },

    // Check if user is guest
    isGuest: () => {
      const { user } = get();
      return user?.isIncognito || false;
    },
  }))
);

export default useAuthStore;
