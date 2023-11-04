import { Route, Routes } from 'react-router-dom'
import HomeLayout from './features/home/HomeLayout'
import HomePage from './features/home/HomePage'
import WorkspaceLayout from './features/workspaces/WorkspaceLayout'
import WorkspacePage from './features/workspaces/WorkspacePage'
import { Box } from '@mui/material'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="workspaces/:id" element={<WorkspaceLayout />}>
          <Route index element={<WorkspacePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Box>404 Not Found Page</Box>} />
    </Routes>
  )
}

export default App
