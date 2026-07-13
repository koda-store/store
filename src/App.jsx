import { Route, Routes } from 'react-router-dom'
import Navbar from './components/ui/NavBar'
import Home from './pages/Home'

function App() {
  return (
    <>
      <header>
        {/* <Navbar /> */}
      </header>
      <main>
        <Routes>
          <Route path={'/'} element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default App
