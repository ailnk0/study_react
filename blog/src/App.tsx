import { Routes, Route } from 'react-router-dom'
import About from './routes/About'
import Home from './routes/Home'
import Error from './routes/Error'
import ActionBar from './components/ActionBar'

function App() {
  return (
    <>
      <ActionBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
