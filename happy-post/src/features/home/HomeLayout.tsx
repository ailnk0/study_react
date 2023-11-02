import { Box } from '@mui/material'
import ActionBar from './components/ActionBar'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <Box>
      <Box>
        <ActionBar />
      </Box>
      <Box sx={{ display: 'flex', mt: 2, p: 1 }}>
        <Box sx={{ m: 1 }}>
          <SideBar />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
