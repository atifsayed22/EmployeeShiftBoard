import Login from "./pages/Login.jsx"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./components/protectedRoutes.jsx"
import Dashboard from "./pages/Dashboard.jsx"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
       <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
      </Routes>
    </BrowserRouter>
  )
}

export default App
