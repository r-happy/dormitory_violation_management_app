export type User = {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'admin';
};

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
};