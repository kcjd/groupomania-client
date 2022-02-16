import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './app/hooks'
import AppLayout from './components/AppLayout'
import AuthLayout from './components/AuthLayout'
import PrivateRoute from './components/PrivateRoute'
import { getPosts } from './features/postsSlice'
import { getUsers } from './features/usersSlice'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import Users from './pages/Users/Users'

const App = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      dispatch(getUsers())
      dispatch(getPosts())
    }
  }, [user])

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="profile/:userId" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
