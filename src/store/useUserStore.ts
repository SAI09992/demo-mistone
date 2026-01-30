import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  phone: string | null
  name: string | null
  email: string | null
  isAuthenticated: boolean
  login: (phone: string) => void
  logout: () => void
  updateProfile: (data: { name?: string; email?: string }) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      phone: null,
      name: "Guest User",
      email: null,
      isAuthenticated: false,
      login: (phone) => set({ phone, isAuthenticated: true }),
      logout: () => set({ phone: null, name: "Guest User", email: null, isAuthenticated: false }),
      updateProfile: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'mistnove-user-storage',
    }
  )
)
