
import { Navigate, Routes, Route } from 'react-router-dom'

import { LoginPages, RegisterPages } from '../pages'

export const AuthRouter = () => {
  return (
    <Routes>

        <Route path="login" element ={ <LoginPages /> } />
        <Route path="register" element ={ <RegisterPages /> } />

        <Route path="/*" element={ <Navigate to="/auth/login" /> }/>

    </Routes>
  )
} 
