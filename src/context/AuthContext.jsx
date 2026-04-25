import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('currentUser')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (studentId, password) => {
    // Mock authentication - in production, call API
    if (studentId && password) {
      // Automatically assign team based on Student ID (dev chooses for user)
      const teamId = (parseInt(studentId.slice(-1)) % 4) + 1
      const TEAMS = {
        1: 'Thunder Dragons',
        2: 'Phoenix Strikers',
        3: 'Titan Guardians',
        4: 'Shadow Wolves',
      }

      const newUser = {
        studentId,
        name: `Student ${studentId.slice(-4)}`,
        team: TEAMS[teamId],
        teamId: teamId,
      }
      setUser(newUser)
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      return true
    }
    return false
  }

  const register = (data) => {
    // Automatically assign team based on Student ID (dev chooses for user)
    const teamId = (parseInt(data.studentId.slice(-1)) % 4) + 1
    const TEAMS = {
      1: 'Thunder Dragons',
      2: 'Phoenix Strikers',
      3: 'Titan Guardians',
      4: 'Shadow Wolves',
    }

    // Mock registration - in production, call API
    const newUser = {
      studentId: data.studentId,
      name: `${data.firstName} ${data.lastName}`,
      team: TEAMS[teamId],
      teamId: teamId,
      allergies: data.allergies || [],
    }
    setUser(newUser)
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const updateUser = (updatedData) => {
    const updated = { ...user, ...updatedData }
    setUser(updated)
    localStorage.setItem('currentUser', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
