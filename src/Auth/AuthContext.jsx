import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase/supabase.js'
import { iniciarSesion, registrarUsuario } from '../modules/login/services/authServices.js';

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined) // undefined = cargando

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Tu código original — sigue siendo correcto aquí
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
      session,
      user: session?.user ?? null,
      loading: session === undefined,
      signOut:      () => supabase.auth.signOut(),
      iniciarSesion,
      registrarUsuario,   // ← aquí
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}