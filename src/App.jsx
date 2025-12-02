import './App.css'
import { UserProvider } from './customHooks/UserContext'
import AppRoutes from './route/AppRoutes'

function App() {

  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
