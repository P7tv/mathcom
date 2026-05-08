import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

// Team definitions for Sports Day
export const TEAMS = [
  { id: 'red', name: 'ทีมแดง', nameEn: 'Red', color: '#E85D75', icon: '🔴', bgClass: 'bg-team-red', badgeClass: 'team-badge-red' },
  { id: 'blue', name: 'ทีมน้ำเงิน', nameEn: 'Blue', color: '#4A90D9', icon: '🔵', bgClass: 'bg-team-blue', badgeClass: 'team-badge-blue' },
  { id: 'yellow', name: 'ทีมเหลือง', nameEn: 'Yellow', color: '#E8C85A', icon: '🟡', bgClass: 'bg-team-yellow', badgeClass: 'team-badge-yellow' },
  { id: 'green', name: 'ทีมเขียว', nameEn: 'Green', color: '#4ADE80', icon: '🟢', bgClass: 'bg-team-green', badgeClass: 'team-badge-green' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [allRegistrations, setAllRegistrations] = useState([])

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('sportsDayUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('sportsDayUser')
      }
    }
    const savedAdmin = localStorage.getItem('sportsDayAdmin')
    if (savedAdmin === 'true') {
      setIsAdmin(true)
    }
    setIsLoading(false)
  }, [])

  const saveUser = (userData) => {
    setUser(userData)
    localStorage.setItem('sportsDayUser', JSON.stringify(userData))
  }

  // Register a new participant
  const register = async (data) => {
    // Check if already registered
    const { data: existing } = await supabase
      .from('registrations')
      .select('*')
      .eq('student_id', data.studentId)
      .maybeSingle()

    if (existing) {
      return { success: false, error: 'รหัสนักศึกษานี้ลงทะเบียนแล้ว' }
    }

    const { error } = await supabase.from('registrations').insert({
      student_id: data.studentId,
      first_name: data.firstName,
      last_name: data.lastName,
      nickname: data.nickname || '',
      major: data.major,
      year: data.year || '1',
      food_allergies: data.foodAllergies || '',
      medical_info: data.medicalInfo || '',
      team_id: null,
    })

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: error.message }
    }

    const userData = {
      studentId: data.studentId,
      firstName: data.firstName,
      lastName: data.lastName,
      nickname: data.nickname || '',
      name: `${data.firstName} ${data.lastName}`,
      major: data.major,
      year: data.year || '',
      team: null,
      teamId: null,
      registeredAt: new Date().toISOString(),
    }

    saveUser(userData)
    return { success: true }
  }

  // Check registration status (login by student ID)
  const checkStatus = async (studentId) => {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('student_id', studentId)
      .maybeSingle()

    if (error || !data) {
      // Mock mode: check localStorage for all registrations
      const allRegs = JSON.parse(localStorage.getItem('sportsDayAllRegistrations') || '[]')
      const found = allRegs.find(r => r.studentId === studentId)
      if (found) {
        saveUser(found)
        return { success: true, user: found }
      }
      return { success: false, error: 'ไม่พบข้อมูลการลงทะเบียน กรุณาลงทะเบียนก่อน' }
    }

    const team = data.team_id ? TEAMS.find(t => t.id === data.team_id) : null
    const userData = {
      studentId: data.student_id,
      firstName: data.first_name,
      lastName: data.last_name,
      nickname: data.nickname || '',
      name: `${data.first_name} ${data.last_name}`,
      major: data.major,
      year: data.year || '',
      team: team?.name || null,
      teamId: data.team_id || null,
      isAdmin: data.is_admin || false,
      registeredAt: data.created_at,
    }

    if (data.is_admin) {
      setIsAdmin(true)
      localStorage.setItem('sportsDayAdmin', 'true')
    }

    saveUser(userData)
    return { success: true, user: userData }
  }

  // Admin login
  const adminLogin = (password) => {
    // Simple hardcoded admin password
    if (password === 'mathcom2026') {
      setIsAdmin(true)
      localStorage.setItem('sportsDayAdmin', 'true')
      return true
    }
    return false
  }

  const adminLogout = () => {
    setIsAdmin(false)
    localStorage.removeItem('sportsDayAdmin')
  }

  // Fetch all registrations (admin only)
  const fetchAllRegistrations = async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: true })

    if (error || !data || data.length === 0) {
      // Mock mode: use localStorage
      const allRegs = JSON.parse(localStorage.getItem('sportsDayAllRegistrations') || '[]')
      setAllRegistrations(allRegs)
      return allRegs
    }

    const mapped = data.map(d => ({
      studentId: d.student_id,
      firstName: d.first_name,
      lastName: d.last_name,
      nickname: d.nickname || '',
      name: `${d.first_name} ${d.last_name}`,
      major: d.major,
      year: d.year || '',
      team: d.team_id ? TEAMS.find(t => t.id === d.team_id)?.name : null,
      teamId: d.team_id || null,
      isAdmin: d.is_admin || false,
      foodAllergies: d.food_allergies || '',
      medicalInfo: d.medical_info || '',
      registeredAt: d.created_at,
    }))

    setAllRegistrations(mapped)
    return mapped
  }

  // Toggle Admin status
  const toggleAdmin = async (studentId, status) => {
    await supabase
      .from('registrations')
      .update({ is_admin: status })
      .eq('student_id', studentId)
    
    await fetchAllRegistrations()
  }

  // Assign team to a student (admin only)
  const assignTeam = async (studentId, teamId) => {
    await supabase
      .from('registrations')
      .update({ team_id: teamId })
      .eq('student_id', studentId)

    // Update local mock storage too
    const allRegs = JSON.parse(localStorage.getItem('sportsDayAllRegistrations') || '[]')
    const updated = allRegs.map(r => {
      if (r.studentId === studentId) {
        const team = TEAMS.find(t => t.id === teamId)
        return { ...r, teamId, team: team?.name || null }
      }
      return r
    })
    localStorage.setItem('sportsDayAllRegistrations', JSON.stringify(updated))

    // If current user matches, update their state too
    if (user?.studentId === studentId) {
      const team = TEAMS.find(t => t.id === teamId)
      const updatedUser = { 
        ...user, 
        teamId: teamId || null, 
        team: team?.name || null 
      }
      saveUser(updatedUser)
    }

    await fetchAllRegistrations()
  }

  // Random assign all unassigned students
  const randomAssignTeams = async () => {
    const unassigned = allRegistrations.filter(r => !r.teamId)
    const shuffled = [...unassigned].sort(() => Math.random() - 0.5)

    for (let i = 0; i < shuffled.length; i++) {
      const teamIdx = i % TEAMS.length
      await assignTeam(shuffled[i].studentId, TEAMS[teamIdx].id)
    }
  }

  // Save registration to mock local storage (when Supabase is unavailable)
  const saveToLocalMock = (userData) => {
    const allRegs = JSON.parse(localStorage.getItem('sportsDayAllRegistrations') || '[]')
    const exists = allRegs.find(r => r.studentId === userData.studentId)
    if (!exists) {
      allRegs.push(userData)
      localStorage.setItem('sportsDayAllRegistrations', JSON.stringify(allRegs))
    }
  }

  // Enhanced register that also saves to local mock
  const registerWithMock = async (data) => {
    const result = await register(data)
    if (result.success) {
      saveToLocalMock({
        studentId: data.studentId,
        firstName: data.firstName,
        lastName: data.lastName,
        nickname: data.nickname || '',
        name: `${data.firstName} ${data.lastName}`,
        major: data.major,
        year: data.year || '',
        team: null,
        teamId: null,
        foodAllergies: data.foodAllergies || '',
        medicalInfo: data.medicalInfo || '',
        registeredAt: new Date().toISOString(),
      })
    }
    return result
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sportsDayUser')
  }

  return (
    <AuthContext.Provider value={{
      user, isLoading, isAdmin,
      register: registerWithMock, checkStatus, logout,
      adminLogin, adminLogout,
      allRegistrations, fetchAllRegistrations,
      assignTeam, randomAssignTeams,
      toggleAdmin,
      TEAMS,
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
