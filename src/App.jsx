import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { Register }     from './pages/Register'
import { Login }        from './pages/Login'
import { Onboarding }   from './pages/Onboarding'
import { Registro }     from './pages/Registro'
import { History }      from './pages/History'
import { Profile }      from './pages/Profile'
import { Export }       from './pages/Export'
import { Consultas }    from './pages/Consultas'
import { Recomendacoes } from './pages/Recomendacoes'
import { Medicamentos } from './pages/Medicamentos'
import { useStore }     from './store/useStore'

function PrivateRoute({ children }) {
  const isAuthenticated = useStore(s => s.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/register"   element={<Register />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Rotas privadas dentro do AppShell */}
        <Route path="/" element={<PrivateRoute><AppShell /></PrivateRoute>}>
          <Route index element={<Navigate to="/registro" replace />} />
          <Route path="registro"      element={<Registro />} />
          <Route path="consultas"     element={<Consultas />} />
          <Route path="recomendacoes" element={<Recomendacoes />} />
          <Route path="medicamentos"  element={<Medicamentos />} />
          <Route path="history"       element={<History />} />
          <Route path="profile"       element={<Profile />} />
          <Route path="export"        element={<Export />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
