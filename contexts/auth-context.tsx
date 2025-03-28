"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signOut: () => void
  signInWithSocial: (provider: "google" | "apple") => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Admin credentials
const ADMIN_EMAIL = "cpnow2@yahoo.com"
const ADMIN_PASSWORD = "Passw0rd101"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("promptLibraryUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string, isAdmin = false): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check for admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: "admin-1",
        name: "Admin User",
        email: ADMIN_EMAIL,
        role: "admin",
        avatar: `/placeholder.svg?height=40&width=40`,
      }

      setUser(adminUser)
      localStorage.setItem("promptLibraryUser", JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    }

    // Regular user authentication
    if (email && password) {
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0],
        email,
        role: isAdmin ? "admin" : "user", // This will be ignored if using the admin tab with non-admin credentials
        avatar: `/placeholder.svg?height=40&width=40`,
      }

      setUser(newUser)
      localStorage.setItem("promptLibraryUser", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Mock sign up function
  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Prevent creating an account with the admin email
    if (email === ADMIN_EMAIL) {
      setIsLoading(false)
      throw new Error("This email is already in use")
    }

    // Mock validation (in a real app, this would be server-side)
    if (name && email && password) {
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: "user",
        avatar: `/placeholder.svg?height=40&width=40`,
      }

      setUser(newUser)
      localStorage.setItem("promptLibraryUser", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Sign out function
  const signOut = () => {
    setUser(null)
    localStorage.removeItem("promptLibraryUser")
  }

  // Mock social sign in function
  const signInWithSocial = async (provider: "google" | "apple"): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call and OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create a mock user based on the provider
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: provider === "google" ? "Google User" : "Apple User",
        email: `user@${provider.toLowerCase()}.example.com`,
        role: "user", // Social sign-in users are always regular users
        avatar: `/placeholder.svg?height=40&width=40`,
      }

      setUser(newUser)
      localStorage.setItem("promptLibraryUser", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Social sign-in error:", error)
      throw new Error(typeof error === "string" ? error : "An error occurred during authentication")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, signInWithSocial }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

