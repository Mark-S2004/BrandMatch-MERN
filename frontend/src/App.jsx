import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import MyNavbar from "./Components/MyNavbar"
import Myfooter from "./Components/Myfooter"
import LandingPage from "./pages/LandingPage"
import Users from "./pages/Users"
import Custom404 from "./pages/Custom404"
import Register from "./pages/Register"
import Login from "./pages/Login"

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)

  return (
    <>
      <MyNavbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="*" element={<Custom404 />} />
      </Routes>
      <Myfooter />
    </>
  )
}

export default App
