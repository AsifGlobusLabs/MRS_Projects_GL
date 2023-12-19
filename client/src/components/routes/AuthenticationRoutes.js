import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegistrationForm from '../registration/RegistrationForm'
import Login from '../login/Login'

const AuthenticationRoutes = () => {
  return (
    <div>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<RegistrationForm />} />
    </Routes>
    </div>
  )
}

export default AuthenticationRoutes