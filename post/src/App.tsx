import { useRef, useEffect } from 'react'
import { Box } from '@mui/material'
import ActionBar from './components/ActionBar'
import SideMenu from './components/SideMenu'
import MainViewTabs from './components/MainView'
import './App.css'

function App() {
  const actionBarRef = useRef<HTMLDivElement>(null)
  const contentsBodyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (actionBarRef.current && contentsBodyRef.current) {
      const actionBarHeight = actionBarRef.current.offsetHeight
      contentsBodyRef.current.style.height = `calc(100vh - ${actionBarHeight}px)`
    }
  }, [actionBarRef, contentsBodyRef])

  return (
    <Box>
      <Box ref={actionBarRef}>
        <ActionBar />
      </Box>
      <Box ref={contentsBodyRef} sx={{ display: 'flex', height: '80%' }}>
        <Box sx={{ mt: 2, p: 1, minWidth: '18rem', borderRight: 1, borderColor: 'lightgray' }}>
          <SideMenu />
        </Box>
        <Box sx={{ flexGrow: 1, mt: 2, p: 1 }}>
          <MainViewTabs />
        </Box>
      </Box>
    </Box>
  )
}

export default App
