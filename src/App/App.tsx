import DashboardTable from 'common/components/molecules/DashboardTable'
import SignIn from 'pages/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import ForgetPassword from 'pages/ForgetPassword'
import ResetPassword from 'pages/ResetPassword'
import Register from 'pages/Register'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/dashboard" element={<DashboardTable />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
