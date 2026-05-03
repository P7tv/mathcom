import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

// Available team icons and colors for the create-team picker
export const TEAM_ICONS = ['⚡', '🔥', '💪', '🌙', '🐍', '🦅', '🐻', '🦊', '🐺', '🦁', '🐉', '🌟', '💎', '🎯', '🏆', '⚔️']
export const TEAM_COLORS = [
  '#FF6B9D', '#FF9F43', '#A29BFE', '#6C7A89',
  '#00D4FF', '#E74C3C', '#1ABC9C', '#F39C12',
  '#9B59B6', '#2ECC71', '#E91E63', '#00BCD4',
]

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

  const saveUser = (userData) => {
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const login = async (studentId, password) => {
    if (!studentId || !password) return false

    // Look up existing registration in Supabase
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('student_id', studentId)
      .single()

    if (error || !data) {
      // Fallback: mock login for dev
      saveUser({
        studentId,
        name: `Student ${studentId.slice(-4)}`,
        team: null,
        teamId: null,
        teamIcon: null,
        teamColor: null,
      })
      return true
    }

    // If user has a team, fetch team details
    let teamData = null
    if (data.team_id) {
      const { data: td } = await supabase
        .from('teams')
        .select('*')
        .eq('id', data.team_id)
        .single()
      teamData = td
    }

    saveUser({
      studentId: data.student_id,
      name: `${data.first_name} ${data.last_name}`,
      team: teamData?.name || null,
      teamId: data.team_id || null,
      teamIcon: teamData?.icon || null,
      teamColor: teamData?.color || null,
      major: data.major,
    })
    return true
  }

  const register = async (data) => {
    const { error } = await supabase.from('registrations').insert({
      student_id: data.studentId,
      first_name: data.firstName,
      last_name: data.lastName,
      major: data.major,
      food_allergies: data.foodAllergies || '',
      medical_info: data.medicalInfo || '',
      team_id: null,
      team_name: '',
    })

    if (error) {
      console.error('Supabase registration error:', error)
      if (error.code === '23505') {
        return { success: false, error: 'รหัสนักศึกษานี้ลงทะเบียนไปแล้ว' }
      }
      return { success: false, error: error.message }
    }

    saveUser({
      studentId: data.studentId,
      name: `${data.firstName} ${data.lastName}`,
      team: null,
      teamId: null,
      teamIcon: null,
      teamColor: null,
      major: data.major,
    })

    return { success: true }
  }

  const createTeam = async ({ name, icon, color, slogan }) => {
    if (!user) return { success: false, error: 'Not logged in' }

    // Insert team
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .insert({
        name,
        icon,
        color,
        slogan: slogan || '',
        created_by: user.studentId,
        max_members: 10,
      })
      .select()
      .single()

    if (teamError) {
      console.error('Create team error:', teamError)
      if (teamError.code === '23505') {
        return { success: false, error: 'ชื่อทีมนี้มีคนใช้แล้ว' }
      }
      return { success: false, error: teamError.message }
    }

    // Auto-join: update registration
    const { error: joinError } = await supabase
      .from('registrations')
      .update({ team_id: teamData.id, team_name: name })
      .eq('student_id', user.studentId)

    if (joinError) {
      console.error('Auto-join error:', joinError)
      return { success: false, error: joinError.message }
    }

    saveUser({
      ...user,
      team: name,
      teamId: teamData.id,
      teamIcon: icon,
      teamColor: color,
    })

    return { success: true, team: teamData }
  }

  const joinTeam = async (teamId) => {
    if (!user) return { success: false, error: 'Not logged in' }

    // Fetch team to check capacity
    const { data: teamData, error: fetchError } = await supabase
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single()

    if (fetchError || !teamData) {
      return { success: false, error: 'ไม่พบทีมนี้' }
    }

    // Count current members
    const { count } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', teamId)

    if (count >= teamData.max_members) {
      return { success: false, error: 'ทีมนี้เต็มแล้ว' }
    }

    // Join
    const { error: joinError } = await supabase
      .from('registrations')
      .update({ team_id: teamId, team_name: teamData.name })
      .eq('student_id', user.studentId)

    if (joinError) {
      console.error('Join team error:', joinError)
      return { success: false, error: joinError.message }
    }

    saveUser({
      ...user,
      team: teamData.name,
      teamId: teamData.id,
      teamIcon: teamData.icon,
      teamColor: teamData.color,
    })

    return { success: true }
  }

  const leaveTeam = async () => {
    if (!user || !user.teamId) return { success: false, error: 'ไม่ได้อยู่ทีมไหน' }

    const { error } = await supabase
      .from('registrations')
      .update({ team_id: null, team_name: '' })
      .eq('student_id', user.studentId)

    if (error) {
      console.error('Leave team error:', error)
      return { success: false, error: error.message }
    }

    saveUser({
      ...user,
      team: null,
      teamId: null,
      teamIcon: null,
      teamColor: null,
    })

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const updateUser = (updatedData) => {
    const updated = { ...user, ...updatedData }
    saveUser(updated)
  }

  return (
    <AuthContext.Provider value={{
      user, isLoading,
      login, register, logout, updateUser,
      createTeam, joinTeam, leaveTeam,
    }}>
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
