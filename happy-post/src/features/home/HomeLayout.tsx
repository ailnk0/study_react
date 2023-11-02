import { Box } from '@mui/material'
import ActionBar from './components/ActionBar'
import SideBar from './components/SideBar'

export default function HomeLayout() {
  return (
    <Box>
      <Box>
        <ActionBar />
      </Box>
      <Box sx={{ display: 'flex', mt: 2, p: 2 }}>
        <Box sx={{ maxWidth: '20rem' }}>
          <SideBar />
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
      </Box>
    </Box>
  )
}
