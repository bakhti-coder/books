import { create } from "zustand";
import { TOKEN } from "../constants";

interface AuthTypes {
  isAuthenticated: boolean;
  user: null;
  setIsAuthenticated: (value: boolean) => void;
}

const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Boolean(localStorage.getItem(TOKEN)),
  user: null,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));

export default useAuth;
