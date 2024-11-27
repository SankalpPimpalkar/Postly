import { Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import Home from "./pages/main/Home"
import MainLayout from "./layouts/MainLayout"
import People from "./pages/main/People"
import Profile from "./pages/main/Profile"
import Explore from "./pages/main/Explore"
import PostDetails from "./pages/main/PostDetails"
import UserDetails from "./pages/main/UserDetails"


function App() {
  return (
    <Routes>
      {/* Authentication routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      {/* Main routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="create" element={<Create />} /> */}
        <Route path="explore" element={<Explore />} />
        <Route path="people" element={<People />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="posts/:id" element={<PostDetails />} />
        <Route path="users/:id" element={<UserDetails />} />
      </Route>
    </Routes>
  )
}

export default App