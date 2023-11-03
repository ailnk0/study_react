import { useRef, useEffect, RefObject } from 'react'
import { Box } from '@mui/material'
import ActionBar from './components/ActionBar'
import SideMenu from './components/SideMenu'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  const actionBarRef = useRef<HTMLDivElement>(null)
  const contentsBodyRef = useRef<HTMLDivElement>(null)

  const handleResize = (
    headerRef: RefObject<HTMLDivElement>,
    bodyRef: RefObject<HTMLDivElement>
  ) => {
    if (headerRef.current && bodyRef.current) {
      const headerHeight = headerRef.current.offsetHeight
      bodyRef.current.style.height = `calc(100vh - ${headerHeight}px)`
    }
  }

  useEffect(() => {
    handleResize(actionBarRef, contentsBodyRef)
  }, [actionBarRef, contentsBodyRef])

  return (
    <Box>
      <Box ref={actionBarRef}>
        <ActionBar />
      </Box>
      <Box ref={contentsBodyRef} sx={{ display: 'flex', p: 2 }}>
        <Box sx={{ borderRight: 1, borderColor: 'lightgray' }}>
          <SideMenu />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
